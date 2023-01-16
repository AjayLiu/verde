import React from "react";
import UserStack from "./userStack";
import AuthStack from "./authStack";
import { useUser } from "@utils/hooks/useUser";

export default function RootNavigation() {
	const { isSignedIn } = useUser();

	return isSignedIn ? <UserStack /> : <AuthStack />;
}
