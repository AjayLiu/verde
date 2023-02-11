import React, { Component, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-elements";
import { RouterProps } from "src/types";
import { useUser } from "@utils/hooks/useUser";
import * as imagePicker from "expo-image-picker";
import { FlipType, manipulateAsync, SaveFormat } from "expo-image-manipulator";
import PickUsername from "@components/PickUsername";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "@styles/colors";
import flex from "@styles/flexbox";
import font from "@styles/font";
import ProfilePicture from "@components/ProfilePicture";

export default function HomeScreen({ navigation }: RouterProps) {
	const { authUser, deleteUserFromFirestore, updateProfilePicture } =
		useUser();

	// The path of the picked image
	const [pickedImagePath, setPickedImagePath] = useState("");

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

		const result = await imagePicker.launchCameraAsync({
			quality: 0,
		});

		// Explore the result
		console.log(result);

		const photo = await manipulateAsync(
			result.assets?.at(0)?.uri || "",
			[{ rotate: 180 }, { flip: FlipType.Vertical }],
			{ compress: 0, format: SaveFormat.JPEG },
		);

		if (!result.canceled) {
			setPickedImagePath(photo.uri);
		}
	};

	return (
		<View style={[colors.offBlackBG, flex.alignCenter, styles.height100]}>
			<View style={[styles.height5, colors.offBlackBG]}></View>
			<View style={[flex.row, flex.justifyStart, styles.width100]}>
				<Ionicons
					name="arrow-back-outline"
					style={styles.marL}
					size={25}
					color={"#00CC4B"}
					onPress={() => navigation.navigate("HomeSwiper")}
				/>
			</View>
			<Text style={[font.textCenter, font.sizeXL, colors.offWhite]}>
				Settings for {authUser?.email}!
			</Text>
			<ProfilePicture size={200} />

			<PickUsername></PickUsername>

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
				title="Take profile picture"
				style={styles.button}
				onPress={openCamera}
			/>
			<Button
				title="Confirm changes"
				style={styles.button}
				onPress={() => updateProfilePicture(pickedImagePath)}
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
	button: {
		marginTop: 10,
	},
	height100: {
		height: "100%",
	},
	height5: {
		height: "5%",
	},
	width100: {
		width: "100%",
	},
	marL: {
		marginLeft: 5,
	},
});
