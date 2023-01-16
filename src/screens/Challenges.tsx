import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { RouterProps } from "src/types";
import { useUser } from "@utils/hooks/useUser";

export default function HomeScreen({ navigation }: RouterProps) {
	const { authUser } = useUser();

	return (
		<View style={styles.container}>
			<Text>!!THIS IS A STUB!!</Text>
			<Text>Challenges for {authUser?.email}!</Text>

			<Button
				title="Home"
				style={styles.button}
				onPress={() => navigation.navigate("Home")}
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
