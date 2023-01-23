import { useUser } from "@utils/hooks/useUser";
import React from "react";
import { Image, StyleSheet } from "react-native";
import { FirestoreUser } from "src/types";

type ProfilePictureProps = {
	user?: FirestoreUser;
	style?: any;
};

const size = 35;

const ProfilePicture = (props: ProfilePictureProps) => {
	return (
		// stub
		<Image
			source={{
				uri:
					props.user?.photoUrl ||
					// loading image
					"https://media.istockphoto.com/id/1288130003/vector/loading-progress-circle-in-black-and-white.jpg?s=612x612&w=0&k=20&c=eKCLbwdoJy5a7oofoh9AEt6Mp7dc1p79LCMmR-eNM0U=", // loading image,
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
