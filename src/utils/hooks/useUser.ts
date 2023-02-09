import React, { useContext, useEffect, useRef, useState } from "react";

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
import UsernameContext from "../../contexts/UsernameContext";

const storage = getStorage();

const auth = getAuth();

export function useUser() {
	const [authUser, setAuthUser] = useState<User>();
	const [fireUser, setFireUser] = useState<FirestoreUser>();
	const { uploadImageToStorage } = useUpload();

	const { hasPickedUsername, setHasPickedUsername } =
		useContext(UsernameContext);

	// Auth changes
	useEffect(() => {
		const unsubscribeFromAuthStatusChanged = onAuthStateChanged(
			auth,
			(user) => {
				if (user) {
					// User is signed in, see docs for a list of available properties
					// https://firebase.google.com/docs/reference/js/firebase.User
					setAuthUser(user);
					if (user.displayName && user.displayName != "New User") {
						setHasPickedUsername(true);
					}
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
			// console.log("User data:", docSnap.data());
		} else {
			// doc.data() will be undefined in this case
			console.log("Can't find user data!");
			return -1;
		}

		return docSnap.data() as FirestoreUser;
	};

	const fetchFireUser = async () => {
		if (authUser) {
			const user = await getUserFromFirestore(authUser.uid);
			if (user != -1) setFireUser(user);
		}
	};
	useEffect(() => {
		fetchFireUser();
	}, [authUser]);

	const deleteUserFromFirestore = async (uid: string) => {
		try {
			const usersSnap = await getDoc(doc(db, "users", uid));

			// Delete user's posts and friends
			if (usersSnap.exists()) {
				const postsUidsList = usersSnap.data()?.postsUids as string[];
				const friendsList = usersSnap.data()?.friendsUids as string[];

				// Delete user's profile picture
				try {
					const pfpToDelete = ref(storage, `avatars/${uid}`);
					await deleteObject(pfpToDelete);
				} catch (e) {
					console.log("Error deleting user's profile picture: ", e);
				}

				// Delete user's username from firestore
				await removeUsernameFromFirestore(
					usersSnap.data()?.displayName as string,
				);

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
			setHasPickedUsername(false);
		} catch (e) {
			console.error("Error deleting user: ", e);
		}

		// Delete user's account (has to be logged in recently)
		// TODO: ASK USER TO SIGN IN AGAIN
		if (authUser) deleteUser(authUser);
	};

	// Update the user's photoURL
	const updateProfilePicture = async (
		photoURL = "https://media.istockphoto.com/id/1288130003/vector/loading-progress-circle-in-black-and-white.jpg?s=612x612&w=0&k=20&c=eKCLbwdoJy5a7oofoh9AEt6Mp7dc1p79LCMmR-eNM0U=",
	) => {
		if (!authUser?.uid) {
			console.error("No user logged in");
			return;
		}

		const callback = async (downloadURL: string) => {
			// Update this user's profile
			await updateProfile(authUser, {
				photoURL: downloadURL,
			});

			// Update the changes to user's collection
			await updateUserFirestore(authUser?.uid, {
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
		if (isSignedIn) fetchUsernames();
	}, [isSignedIn]);

	const checkIfUsernameValid = (name: string) => {
		if (usernamesList.includes(name)) {
			console.log("Username already taken");
			return false;
		}
		return true;
	};

	const addUsernameToFirestore = async (username: string) => {
		if (!checkIfUsernameValid(username)) return;

		try {
			const docRef = await updateDoc(doc(db, "users/usernames"), {
				usernames: arrayUnion(username),
			});
			console.log("Username added: ", docRef);
		} catch (e) {
			console.error("Error adding username: ", e);
		}
	};
	const removeUsernameFromFirestore = async (username: string) => {
		try {
			const docRef = await updateDoc(doc(db, "users/usernames"), {
				usernames: arrayRemove(username),
			});
			console.log("Username removed: ", docRef);
		} catch (e) {
			console.error("Error removing username: ", e);
		}
	};

	const updateUsername = async (username: string) => {
		if (!authUser?.uid) {
			console.error("No user logged in");
			return;
		}
		if (!checkIfUsernameValid(username)) return;

		// delete old username from firestore
		await removeUsernameFromFirestore(authUser?.displayName as string);

		// Update this user's profile
		await updateProfile(authUser, { displayName: username });

		// Update the changes to user's collection
		const user = await getUserFromFirestore(authUser.uid);
		// if user is new
		if (user == -1) {
			const createUser = async () => {
				// Some default user values
				const defaultProfilePic =
					"https://img.freepik.com/free-icon/user_318-864557.jpg?w=2000";

				updateProfile(authUser, {
					// displayName: "New User",
					photoURL: defaultProfilePic,
				});

				await writeToUserFirestore({
					uid: authUser?.uid || "ERROR",
					email: authUser?.email || "ERROR",
					displayName: username,
					photoUrl: defaultProfilePic,
					friendsUids: [],
					postsUids: [],
					completedChallengesUids: [],
					score: 0,
				});
				console.log("User created successfully.");
			};

			await createUser();
		} else {
			await updateUserFirestore(authUser?.uid, {
				displayName: username || authUser?.displayName,
			});
		}

		// Add username to firestore
		await addUsernameToFirestore(username);
	};

	return {
		authUser,
		isSignedIn,
		writeToUserFirestore,
		getUserFromFirestore,
		updateUserFirestore,
		deleteUserFromFirestore,
		updateProfilePicture,
		updateUsername,
		checkIfUsernameValid,
		fireUser,
	};
}
