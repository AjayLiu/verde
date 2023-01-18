import { useUser } from "@utils/hooks/useUser";
import React from "react";
import { Image, StyleSheet } from "react-native";

type ProfilePictureProps = {
	uid?: string;
	style?: any;
};

const size = 35;

const ProfilePicture = (props: ProfilePictureProps) => {
	const { authUser } = useUser();
	return (
		// stub
		<Image
			source={{
				uri: authUser?.photoURL || "",
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
