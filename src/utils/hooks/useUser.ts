import React, { useEffect, useState } from "react";

import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { FirestoreUser } from "src/types";
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@config/firebase";

const auth = getAuth();

export function useUser() {
	const [authUser, setAuthUser] = useState<User>();
	const [firestoreUser, setFirestoreUser] = useState<FirestoreUser>();

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
			console.log("Document written: ", docRef);
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	};

	const updateUserFirestore = async (userUid: string, data: any) => {
		try {
			const docRef = await updateDoc(doc(db, "users", userUid), data);
			console.log("Document updated: ", docRef);
		} catch (e) {
			console.error("Error updating document: ", e);
		}
	};

	const getUserFromFirestore = async (uid: string) => {
		const docSnap = await getDoc(doc(db, "users", uid));
		if (docSnap.exists()) {
			console.log("Document data:", docSnap.data());
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
	};

	return {
		authUser,
		isSignedIn,
		writeToUserFirestore,
		getUserFromFirestore,
		updateUserFirestore,
	};
}