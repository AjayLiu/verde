import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuthentication } from "@hooks/useAuthentication";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import Post from "@components/Post";

export default function HomeScreen({ navigation }) {
	const { user } = useAuthentication();
	const auth = getAuth();

	return (
		<View style={styles.container}>
			<Text>Welcome {user?.email}!</Text>

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
