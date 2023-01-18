import React, { useEffect, useState } from "react";

import { deleteUser, getAuth, onAuthStateChanged, User } from "firebase/auth";
import { FirestoreUser } from "src/types";
import {
	getDoc,
	doc,
	setDoc,
	updateDoc,
	deleteDoc,
	arrayRemove,
} from "firebase/firestore";
import { db } from "@config/firebase";
import { getStorage, ref, deleteObject } from "firebase/storage";

const storage = getStorage();

const auth = getAuth();

export function useUser() {
	const [authUser, setAuthUser] = useState<User>();

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

	return {
		authUser,
		isSignedIn,
		writeToUserFirestore,
		getUserFromFirestore,
		updateUserFirestore,
		deleteUserFromFirestore,
	};
}
