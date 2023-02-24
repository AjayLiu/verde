import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
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
			<Text
				style={[font.sizeL, colors.lightGreen]}
				onPress={() => updateProfilePicture(pickedImagePath)}
			>
				SAVE
			</Text>
			<ProfilePicture size={200} />
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
	bottom: {
		paddingBottom: 20,
	}
});
