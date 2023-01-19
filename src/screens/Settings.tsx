import React, { Component, useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { RouterProps } from "src/types";
import { useUser } from "@utils/hooks/useUser";
import * as imagePicker from "expo-image-picker";

export default function HomeScreen({ navigation }: RouterProps) {
	const { authUser, deleteUserFromFirestore, updateUserFirestore } =
		useUser();

	// The path of the picked image
	const [pickedImagePath, setPickedImagePath] = useState("");

	// Update the user's displayName and/or photoURL
	const updateUserProfile = async (
		displayName?: string,
		photoURL?: string,
	) => {
		if (!authUser?.uid) {
			console.error("No user logged in");
			return;
		}

		await updateUserFirestore(authUser?.uid, {
			displayName: displayName || authUser?.displayName,
			photoURL: photoURL || authUser?.photoURL,
		});
	};

	const deleteAccount = async () => {
		console.log("Deleting account");

		await deleteUserFromFirestore(authUser?.uid || "");
	};

	// This function is triggered when the "Select an image" button pressed
	const showImagePicker = async () => {
		const result = await imagePicker.launchImageLibraryAsync({});

		// Explore the result
		// console.log(result);

		if (!result.canceled) {
			setPickedImagePath(result.assets[0].uri);
			// console.log(result.assets[0]);
		}
	};

	// This function is triggered when the "Open camera" button pressed
	const openCamera = async () => {
		// Ask the user for the permission to access the camera
		const permissionResult =
			await imagePicker.requestCameraPermissionsAsync();

		if (permissionResult.granted === false) {
			alert("You've refused to allow this appp to access your camera!");
			return;
		}

		const result = await imagePicker.launchCameraAsync();

		// Explore the result
		console.log(result);

		if (!result.canceled) {
			setPickedImagePath(result.assets[0].uri);
		}
	};

	useEffect(() => {
		console.log("Picked image path: " + pickedImagePath);
	}, [pickedImagePath]);
	return (
		<View style={styles.container}>
			<Text>!!THIS IS A STUB!!</Text>
			<Text>Settings for {authUser?.email}!</Text>

			<Image
				source={{
					uri:
						pickedImagePath ||
						authUser?.photoURL ||
						"https://media.istockphoto.com/id/1288130003/vector/loading-progress-circle-in-black-and-white.jpg?s=612x612&w=0&k=20&c=eKCLbwdoJy5a7oofoh9AEt6Mp7dc1p79LCMmR-eNM0U=",
				}}
				style={{ width: 200, height: 200 }}
			></Image>

			<Button
				title="Profile"
				style={styles.button}
				onPress={() => navigation.navigate("Profile")}
			/>

			<Button
				title="Change Profile Picture"
				style={styles.button}
				onPress={showImagePicker}
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
