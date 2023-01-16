import React from "react";

import { getAuth, onAuthStateChanged, User } from "firebase/auth";

const auth = getAuth();
export function useUser() {
	const [authUser, setAuthUser] = React.useState<User>();

	React.useEffect(() => {
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

	return { authUser };
}
