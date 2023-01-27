import React, { useEffect, useState, createContext, useContext } from "react";
import UserStack from "./userStack";
import AuthStack from "./authStack";
import { useUser } from "@utils/hooks/useUser";
import UsernameContext from "../contexts/UsernameContext";

export default function RootNavigation() {
	const { isSignedIn } = useUser();
	const { hasPickedUsername, setHasPickedUsername } =
		useContext(UsernameContext);

	if (!isSignedIn || !hasPickedUsername) {
		return <AuthStack />;
	}
	return <UserStack />;
}
