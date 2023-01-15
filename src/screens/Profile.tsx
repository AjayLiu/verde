import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuthentication } from "@hooks/useAuthentication";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";

export default function HomeScreen({ navigation }) {
	const { user } = useAuthentication();
	const auth = getAuth();

	return (
		<View style={styles.container}>
			<Text>!!THIS IS A STUB!!</Text>
			<Text>Profile for {user?.email}!</Text>

			<Button
				title="Home"
				style={styles.button}
				onPress={() => navigation.navigate("Home")}
			/>

			<Button
				title="Calendar"
				style={styles.button}
				onPress={() => navigation.navigate("Calendar")}
			/>

			<Button
				title="Friends"
				style={styles.button}
				onPress={() => navigation.navigate("Friends")}
			/>

			<Button
				title="Settings"
				style={styles.button}
				onPress={() => navigation.navigate("Settings")}
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
