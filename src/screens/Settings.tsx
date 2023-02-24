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
import { signOut } from "firebase/auth/react-native";
import { getAuth } from "firebase/auth";

const auth = getAuth();

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
			alert("You've refused to allow this app to access your camera!");
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
		<View
			style={[
				styles.height100,
				colors.offBlackBG,
				flex.column,
				flex.alignCenter,
				flex.justifyStart,
			]}
		>
			<View style={[flex.row, flex.justifyEnd]}>
				<Ionicons
					name="person"
					iconStyle={styles}
					size={22.5}
					color={"#00CC4B"}
					onPress={() => navigation.navigate("HomeSwiper")}
				/>

				<Text
					style={[font.sizeL, colors.lightGreen]}
					onPress={() => updateProfilePicture(pickedImagePath)}
				>
					SAVE
				</Text>
			</View>

			<Image
				source={{
					uri:
						pickedImagePath ||
						authUser?.photoURL ||
						"https://media.istockphoto.com/id/1288130003/vector/loading-progress-circle-in-black-and-white.jpg?s=612x612&w=0&k=20&c=eKCLbwdoJy5a7oofoh9AEt6Mp7dc1p79LCMmR-eNM0U=",
				}}
				style={{ width: 200, height: 200, borderRadius: 200 / 2 }}
			></Image>

			<PickUsername></PickUsername>

			<Text
				style={[font.fontBold, font.sizeXL, colors.offWhite]}
				onPress={showImagePicker}
			>
				Change Profile Picture
			</Text>

			<Text
				style={[font.fontBold, font.sizeXL, colors.offWhite]}
				onPress={openCamera}
			>
				Take Profile Picture
			</Text>

			<Text
				style={[font.fontBold, font.sizeXL, colors.offWhite]}
				onPress={() => {
					signOut(auth);
				}}
			>
				Sign Out
			</Text>

			<Text
				style={[font.fontBold, font.sizeXL, colors.offWhite]}
				onPress={deleteAccount}
			>
				Delete Account
			</Text>
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
	height100: {
		height: "100%",
		padding: 50,
	},
	h100: {
		height: "100%",
	},
});

const icon = StyleSheet.create({
	space: {
		position: "relative",
		left: -165,
	},
});
