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

	// This function is triggered when the "Select an image" button pressed
	const showImagePicker = async () => {
		const result = await imagePicker.launchImageLibraryAsync({});

		// Explore the result
		// console.log(result);

		if (!result.canceled) {
			setPickedImagePath(result.assets[0].uri);
			// console.log(result.assets[0]);
			updateProfilePicture(result.assets[0].uri);
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
			updateProfilePicture(photo.uri);
		}
	};

	return (
		<View style={[colors.offBlackBG, flex.alignCenter, styles.height100]}>
			<View style={[styles.height6, colors.offBlackBG]}></View>
			<View style={[flex.row, flex.justifyStart, styles.width100]}>
				<Ionicons
					name="arrow-back-outline"
					style={[styles.marL]}
					size={35}
					color={"#00CC4B"}
					onPress={() => navigation.navigate("HomeSwiper")}
				/>
			</View>
			{/* <View
				style={[
					flex.row,
					flex.justifyStart,
					styles.width100,
					styles.marL,
				]}
			>
				<Text
					style={[
						font.sizeXXL,
						font.fontBold,
						colors.offWhite,
						styles.marL,
						styles.marB,
					]}
				>
					Settings
				</Text>
			</View> */}
			<ProfilePicture size={100} />
			<View
				style={[
					flex.column,
					flex.justifyStart,
					flex.alignStart,
					styles.width100,
					styles.marL,
					styles.marT,
					styles.spacePadding,
				]}
			>
				<Text
					style={[
						font.sizeXL,
						colors.offWhite,
						font.fontBold,
						styles.marL,
						styles.marB,
					]}
				>
					Profile Picture
				</Text>
				<Text
					style={[
						font.sizeL,
						colors.lightGreen,
						styles.marL,
						styles.marB,
						font.fontBold,
					]}
					onPress={showImagePicker}
				>
					Choose Photo
				</Text>
				<Text
					style={[
						font.sizeL,
						colors.lightGreen,
						styles.marL,
						styles.marB,
						font.fontBold,
					]}
					onPress={openCamera}
				>
					Take Photo
				</Text>
			</View>
			<View
				style={[
					flex.row,
					flex.justifyStart,
					styles.width100,
					styles.marL,
				]}
			>
				<Text
					style={[
						font.sizeXL,
						colors.offWhite,
						font.fontBold,
						styles.marL,
						styles.marB,
						styles.marT,
						styles.spacePadding,
					]}
				>
					Change Username
				</Text>
			</View>
			<View style={[styles.width100, styles.marL, styles.horMar]}>
				<PickUsername></PickUsername>
			</View>

			<View
				style={[
					flex.row,
					flex.justifyStart,
					styles.width100,
					styles.marL,
				]}
			>
				<Text
					style={[
						font.sizeXL,
						colors.offWhite,
						font.fontBold,
						styles.marL,
						styles.marB,
						styles.marT,
						styles.spacePadding,
					]}
				>
					Other
				</Text>
			</View>

			<View style={[styles.width100, styles.marL]}>
				<Text
					style={[
						// font.fontBold,
						font.sizeL,
						colors.lightGreen,
						styles.marL,
						styles.marB,
						font.fontBold,
					]}
					onPress={() => {
						signOut(auth);
					}}
				>
					Sign Out
				</Text>

				<Text
					style={[
						font.sizeL,
						styles.marL,
						styles.marB,
						font.fontBold,
						colors.warningRed,
					]}
					onPress={() => navigation.navigate("DeleteAccount")}
				>
					Delete Account
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	height100: {
		height: "100%",
	},
	height6: {
		height: "6%",
	},
	width100: {
		width: "100%",
	},
	marL: {
		marginLeft: 15,
	},
	marB: {
		marginBottom: 5,
	},
	marT: {
		marginTop: 5,
	},
	marR: {
		paddingRight: 15,
	},
	horMar: {
		paddingHorizontal: 10,
	},
	spacePadding: {
		paddingTop: 20,
	},
});
