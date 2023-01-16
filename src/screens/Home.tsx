import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useUser } from "@hooks/useUser";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import Post from "@components/Post";
import { RouterProps } from "src/types";

export default function HomeScreen({ navigation }: RouterProps) {
	const { authUser } = useUser();
	const auth = getAuth();

	return (
		<View style={styles.container}>
			<Text>Welcome {authUser?.email}!</Text>

			<Button
				title="Sign Out"
				style={styles.button}
				onPress={() => signOut(auth)}
			/>

			<Button
				title="Camera"
				style={styles.button}
				onPress={() => navigation.navigate("Camera")}
			/>

			<Button
				title="Challenges"
				style={styles.button}
				onPress={() => navigation.navigate("Challenges")}
			/>

			<Button
				title="Profile"
				style={styles.button}
				onPress={() => navigation.navigate("Profile")}
			/>

			<Post
				image="https://www.thisiscolossal.com/wp-content/uploads/2019/02/moon_crop.jpg"
				uid=""
				caption="i took a picture of the moon"
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
