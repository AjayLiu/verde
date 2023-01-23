import React, { useEffect, useState } from "react";

import {
	deleteUser,
	getAuth,
	onAuthStateChanged,
	updateProfile,
	User,
} from "firebase/auth";
import { FirestoreUser } from "src/types";
import {
	getDoc,
	doc,
	setDoc,
	updateDoc,
	deleteDoc,
	arrayRemove,
	arrayUnion,
} from "firebase/firestore";
import { db } from "@config/firebase";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { useUpload } from "./useUpload";

const storage = getStorage();

const auth = getAuth();

export function useUser() {
	const [authUser, setAuthUser] = useState<User>();
	const { uploadImageToStorage } = useUpload();

	// Auth changes
	useEffect(() => {
		const unsubscribeFromAuthStatusChanged = onAuthStateChanged(
			auth,
			(user) => {
				if (user) {
					// User is signed in, see docs for a list of available properties
					// https://firebase.google.com/docs/reference/js/firebase.User
					setAuthUser(user);
				} else {
					// User is signed out
					setAuthUser(undefined);
				}
			},
		);

		return unsubscribeFromAuthStatusChanged;
	}, []);

	const isSignedIn = authUser !== undefined;

	const writeToUserFirestore = async (user: FirestoreUser) => {
		try {
			console.log(user);
			const docRef = await setDoc(doc(db, "users", user.uid), user);
			console.log("User written: ", docRef);
		} catch (e) {
			console.error("Error writing user: ", e);
		}
	};

	const updateUserFirestore = async (userUid: string, data: any) => {
		try {
			const docRef = await updateDoc(doc(db, "users", userUid), data);
			console.log("User updated: ", docRef);
		} catch (e) {
			console.error("Error updating user: ", e);
		}
	};

	const getUserFromFirestore = async (uid: string) => {
		const docSnap = await getDoc(doc(db, "users", uid));
		if (docSnap.exists()) {
			console.log("User data:", docSnap.data());
		} else {
			// doc.data() will be undefined in this case
			console.log("Can't find user data!");
		}

		return docSnap.data() as FirestoreUser;
	};

	const deleteUserFromFirestore = async (uid: string) => {
		try {
			const usersSnap = await getDoc(doc(db, "users", uid));

			// Delete user's posts and friends
			if (usersSnap.exists()) {
				const postsUidsList = usersSnap.data()?.postsUids as string[];
				const friendsList = usersSnap.data()?.friendsUids as string[];

				// Delete user's posts
				postsUidsList?.forEach(async (postUid: string) => {
					// Create a reference to the file to delete
					const imageToDelete = ref(storage, `posts/${postUid}`);

					// Delete the file
					deleteObject(imageToDelete)
						.then(() => {
							// File deleted successfully
							console.log("File deleted successfully");
						})
						.catch((error) => {
							// Uh-oh, an error occurred!
							console.log("Error deleting file: ", error);
						});

					// Delete the post from firestore
					await deleteDoc(doc(db, "posts", postUid));
				});

				// Delete user's friends
				friendsList?.forEach(async (friendUid: string) => {
					updateDoc(doc(db, "users", friendUid), {
						friendsUids: arrayRemove(uid),
					});
				});
			}

			const deleteUserRef = await deleteDoc(doc(db, "users", uid));
			console.log("User deleted: ", deleteUserRef);
		} catch (e) {
			console.error("Error deleting user: , e");
		}

		// Delete user's account (has to be logged in recently)
		// TODO: ASK USER TO SIGN IN AGAIN
		if (authUser) deleteUser(authUser);
	};

	// Update the user's displayName and/or photoURL
	const updateUserProfile = async (
		displayName = "New User",
		photoURL = "https://media.istockphoto.com/id/1288130003/vector/loading-progress-circle-in-black-and-white.jpg?s=612x612&w=0&k=20&c=eKCLbwdoJy5a7oofoh9AEt6Mp7dc1p79LCMmR-eNM0U=",
	) => {
		if (!authUser?.uid) {
			console.error("No user logged in");
			return;
		}

		const callback = async (downloadURL: string) => {
			// Update this user's profile
			await updateProfile(authUser, {
				displayName: displayName,
				photoURL: downloadURL,
			});

			// Update the changes to user's collection
			await updateUserFirestore(authUser?.uid, {
				displayName: displayName || authUser?.displayName,
				photoUrl: downloadURL || authUser?.photoURL,
			});
		};

		uploadImageToStorage(photoURL, "avatars/" + authUser.uid, callback);
	};

	const [usernamesList, setUsernamesList] = useState<string[]>([]);

	useEffect(() => {
		const fetchUsernames = async () => {
			const usernamesSnap = await getDoc(doc(db, "users/usernames"));

			if (usernamesSnap.exists()) {
				setUsernamesList(usernamesSnap.data()?.usernames as string[]);
			}
		};
		fetchUsernames();
	}, []);

	const checkIfUsernameValid = async () => {
		return !usernamesList.includes(authUser?.displayName as string);
	};

	const addUsernameToFirestore = async (username: string) => {
		try {
			const docRef = await updateDoc(doc(db, "users/usernames"), {
				usernames: arrayUnion(username),
			});
			console.log("Username added: ", docRef);
		} catch (e) {
			console.error("Error adding username: ", e);
		}
	};

	return {
		authUser,
		isSignedIn,
		writeToUserFirestore,
		getUserFromFirestore,
		updateUserFirestore,
		deleteUserFromFirestore,
		updateUserProfile,
		checkIfUsernameValid,
		addUsernameToFirestore,
	};
}
