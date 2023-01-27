import { useUser } from "@utils/hooks/useUser";
import React from "react";
import { Text, StyleSheet } from "react-native";
import { FirestoreUser } from "src/types";

type UsernameProps = {
	user?: FirestoreUser;
	style?: any;
};

// unused component, consider deleting
export const Username = (props: UsernameProps) => {
	return (
		// stub
		<Text style={[styles.username, props.style]}>
			{props.user?.displayName}
		</Text>
	);
};

const styles = StyleSheet.create({
	username: {
		fontWeight: "bold",
	},
});

export default Username;
