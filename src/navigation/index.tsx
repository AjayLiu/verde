import React, { useEffect } from "react";
import UserStack from "./userStack";
import AuthStack from "./authStack";
import { useUser } from "@utils/hooks/useUser";

export default function RootNavigation() {
	const { isSignedIn, authUser } = useUser();

	useEffect(() => {
		console.log(authUser?.displayName);
	}, [authUser?.displayName]);

	return isSignedIn &&
		authUser?.displayName &&
		authUser.displayName != "New User" ? (
		<UserStack />
	) : (
		<AuthStack />
	);
}
