import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

type PostProps = {
	image: string;
	username: string;
	caption: string;
	comment: string;
};

const styles = StyleSheet.create({
	image: {
		width: 100,
		height: 100,
	},
});

const Post = (props: PostProps) => {
	return (
		<View>
			<View>
				<Text>{props.username}</Text>
			</View>
			<Image
				style={styles.image}
				source={{
					uri: props.image,
				}}
			/>
			<View>
				<Text>{props.caption}</Text>
				<Text>{props.comment}</Text>
			</View>
		</View>
	);
};

export default Post;
