import { useUser } from "@utils/hooks/useUser";
import React from "react";
import { Image, StyleSheet } from "react-native";
import { FirestoreUser } from "src/types";

type ProfilePictureProps = {
	user?: FirestoreUser;
	style?: any;
	size?: number;
};

const ProfilePicture = (props: ProfilePictureProps) => {
	return (
		<Image
			source={{
				uri:
					props.user?.photoUrl ||
					// loading image
					"https://media.istockphoto.com/id/1288130003/vector/loading-progress-circle-in-black-and-white.jpg?s=612x612&w=0&k=20&c=eKCLbwdoJy5a7oofoh9AEt6Mp7dc1p79LCMmR-eNM0U=", // loading image,
			}}
			style={[
				{
					height: props.size,
					width: props.size,
					borderRadius:
						typeof props.size == "undefined" ? 20 : props.size / 2,
				},
				props.style,
			]}
		/>
	);
};

const styles = StyleSheet.create({
	image: {},
});

export default ProfilePicture;
