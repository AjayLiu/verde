import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { RouterProps } from "src/types";
import { useUser } from "@utils/hooks/useUser";

export default function HomeScreen({ navigation }: RouterProps) {
	const { authUser, deleteUserFromFirestore } = useUser();

	const deleteAccount = async () => {
		console.log("Deleting account");

		await deleteUserFromFirestore(authUser?.uid || "");
	};

	return (
		<View style={styles.container}>
			<Text>!!THIS IS A STUB!!</Text>
			<Text>Settings for {authUser?.email}!</Text>

			<Button
				title="Profile"
				style={styles.button}
				onPress={() => navigation.navigate("Profile")}
			/>

			<Button
				title="Delete account"
				style={styles.button}
				onPress={deleteAccount}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	button: {
		marginTop: 10,
	},
});
