import React from "react";
import { Image, StyleSheet } from "react-native";

type ProfilePictureProps = {
	uid?: string;
	style?: any;
};

const size = 35;

const ProfilePicture = (props: ProfilePictureProps) => {
	return (
		// TODO: make call to firebase to get profile picture for uid and put link in stub below

		// stub
		<Image
			source={{
				uri: "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
			}}
			style={[styles.image, props.style]}
		/>
	);
};

const styles = StyleSheet.create({
	image: {
		height: size,
		width: size,
		borderRadius: size / 2,
	},
});

export default ProfilePicture;
