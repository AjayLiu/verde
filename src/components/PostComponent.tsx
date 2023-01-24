import React from "react";
import { Text, View, Image, StyleSheet, Dimensions } from "react-native";
import Username from "@components/Username";
import ProfilePicture from "@components/ProfilePicture";
import { Post } from "src/types";

const dimensions = Dimensions.get("window");

type PostProps = {
	post: Post;
};

const PostComponent = (props: PostProps) => {
	return (
		<View style={styles.outer}>
			<View style={styles.inner}>
				<ProfilePicture size={35} />
				<Username style={styles.username} />
			</View>
			<Image
				style={styles.image}
				source={{
					uri:
						props.post.imgUrl ||
						// loading image
						"https://media.istockphoto.com/id/1288130003/vector/loading-progress-circle-in-black-and-white.jpg?s=612x612&w=0&k=20&c=eKCLbwdoJy5a7oofoh9AEt6Mp7dc1p79LCMmR-eNM0U=", // loading image
				}}
			/>
			{/* TODO: Add like button, comment button, share button? */}
			<View style={styles.inner}>
				<Username />
				<Text style={styles.caption}>{props.post.caption}</Text>
			</View>
			{/* TODO: Add comment section under post */}
		</View>
	);
};

const styles = StyleSheet.create({
	outer: {
		width: "100%",
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

export default PostComponent;
