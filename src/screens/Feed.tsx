import React, { Component, useCallback, useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useUser } from "@hooks/useUser";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import PostComponent from "@components/PostComponent";
import { Post, RouterProps } from "src/types";
import { usePost } from "@utils/hooks/usePost";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import UsernameContext from "../contexts/UsernameContext";

export default function FeedScreen({ navigation }: RouterProps) {
	const { authUser } = useUser();
	const auth = getAuth();
	const { getAllPosts } = usePost();

	const [posts, setPosts] = React.useState<Post[]>([]);

	const fetchAllPosts = async () => {
		const allPosts = await getAllPosts();
		setPosts(allPosts);
	};

	useEffect(() => {
		fetchAllPosts();
	}, []);

	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = useCallback(async () => {
		await fetchAllPosts();
		setRefreshing(false);
	}, []);

	const { hasPickedUsername, setHasPickedUsername } =
		useContext(UsernameContext);

	return (
		<ScrollView
			refreshControl={
				<RefreshControl
					refreshing={refreshing}
					onRefresh={onRefresh}
				></RefreshControl>
			}
		>
			<View style={styles.container}>
				<Text>Welcome {authUser?.displayName}!</Text>

				<Button
					title="Sign Out"
					style={styles.button}
					onPress={() => {
						setHasPickedUsername(false);
						signOut(auth);
					}}
				/>

				<Button
					title="Camera"
					style={styles.button}
					onPress={() => navigation.navigate("Camera")}
				/>

				<Button
					title="Challenges"
					style={styles.button}
					onPress={() => navigation.navigate("Challenges")}
				/>

				<Button
					title="Profile"
					style={styles.button}
					onPress={() => navigation.navigate("Profile")}
				/>

				{posts.map((post: Post) => {
					return <PostComponent key={post.uid} post={post} />;
				})}
			</View>
		</ScrollView>
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
});
