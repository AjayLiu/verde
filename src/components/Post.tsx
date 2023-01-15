import React from "react";
import { Text, View, Image, StyleSheet, Dimensions } from "react-native";
import Username from "@components/Username";
import ProfilePicture from "@components/ProfilePicture";

const dimensions = Dimensions.get("window");

type PostProps = {
	image: string;
	uid: string;
	caption: string;
};

const Post = (props: PostProps) => {
	return (
		<View style={styles.outer}>
			<View style={styles.inner}>
				<ProfilePicture />
				<Username style={styles.username} />
			</View>
			<Image
				style={styles.image}
				source={{
					uri: props.image,
				}}
			/>
			{/* TODO: Add like button, comment button, share button? */}
			<View style={styles.inner}>
				<Username />
				<Text style={styles.caption}>{props.caption}</Text>
			</View>
			{/* TODO: Add comment section under post */}
		</View>
	);
};

const styles = StyleSheet.create({
	outer: {
		width: "100%",
		borderColor: "black",
		borderWidth: 1,
	},
	inner: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	username: {
		width: "85%",
	},
	caption: {
		width: "68%",
	},
	image: {
		width: dimensions.width,
		height: dimensions.width,
	},
});

export default Post;
