import React, { useEffect, useState, createContext, useContext } from "react";
import UserStack from "./userStack";
import AuthStack from "./authStack";
import { useUser } from "@utils/hooks/useUser";
import UsernameContext from "../contexts/UsernameContext";

export default function RootNavigation() {
	const { isSignedIn } = useUser();
	const [hasPickedUsername, setHasPickedUsername] = useState(false);

	if (!isSignedIn || !hasPickedUsername) {
		return (
			<UsernameContext.Provider
				value={{ hasPickedUsername, setHasPickedUsername }}
			>
				<AuthStack />
			</UsernameContext.Provider>
		);
	}
	return <UserStack />;
}
