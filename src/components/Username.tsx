import React from "react";
import { Text, StyleSheet } from "react-native";

type UsernameProps = {
	uid?: string;
	style?: any;
};

export const Username = (props: UsernameProps) => {
	return (
		// TODO: make call to firebase to find username for uid, then put username in stub below

		// stub
		<Text style={[styles.username, props.style]}>username_here</Text>
	);
};

const styles = StyleSheet.create({
	username: {
		fontWeight: "bold",
	},
});

export default Username;
