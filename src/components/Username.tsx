import { useUser } from "@utils/hooks/useUser";
import React from "react";
import { Text, StyleSheet } from "react-native";

type UsernameProps = {
	uid?: string;
	style?: any;
};

export const Username = (props: UsernameProps) => {
	const { authUser } = useUser();
	return (
		// stub
		<Text style={[styles.username, props.style]}>
			{authUser?.displayName}
		</Text>
	);
};

const styles = StyleSheet.create({
	username: {
		fontWeight: "bold",
	},
});

export default Username;
