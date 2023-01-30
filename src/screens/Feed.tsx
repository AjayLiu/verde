import React, { Component, useCallback, useContext, useEffect } from "react";
import { NativeScrollEvent, StyleSheet, Text, View } from "react-native";
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

	const [allPosts, setAllPosts] = React.useState<Post[]>([]);
	const [numPostsToShow, setNumPostsToShow] = React.useState(5);

	const fetchAllPosts = async () => {
		const allPostsResult = await getAllPosts();
		setAllPosts(allPostsResult);
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

	const isCloseToBottom = ({
		layoutMeasurement,
		contentOffset,
		contentSize,
	}: NativeScrollEvent) => {
		const paddingToBottom = 20;
		return (
			layoutMeasurement.height + contentOffset.y >=
			contentSize.height - paddingToBottom
		);
	};

	const fetchMorePosts = () => {
		setNumPostsToShow(numPostsToShow + 5);
	};

	return (
		<ScrollView
			refreshControl={
				<RefreshControl
					refreshing={refreshing}
					onRefresh={onRefresh}
				></RefreshControl>
			}
			onScroll={({ nativeEvent }) => {
				if (isCloseToBottom(nativeEvent)) {
					fetchMorePosts();
				}
			}}
			scrollEventThrottle={400}
		>
			<View style={styles.container}>
				<Text>Welcome {authUser?.displayName}!</Text>

{/*<<<<<<< HEAD*/}
{/*				<Button*/}
{/*					title="Sign Out"*/}
{/*					style={styles.button}*/}
{/*					onPress={() => {*/}
{/*						setHasPickedUsername(false);*/}
{/*						signOut(auth);*/}
{/*					}}*/}
{/*				/>*/}
{/*=======*/}
				{/*<Button*/}
				{/*	title="Sign Out"*/}
				{/*	style={styles.button}*/}
				{/*	onPress={() => {*/}
				{/*		setHasPickedUsername(false);*/}
				{/*		signOut(auth);*/}
				{/*	}}/>*/}
{/*>>>>>>> 4d8f9f6 (fix camera)*/}

				<Button
					title="CAMERA"
					style={styles.button}
					onPress={() => navigation.navigate("Camera")}
				/>

{/*<<<<<<< HEAD*/}
{/*				<Button*/}
{/*					title="Challenges"*/}
{/*					style={styles.button}*/}
{/*					onPress={() => navigation.navigate("Challenges")}*/}
{/*				/>*/}

{/*				<Button*/}
{/*					title="Profile"*/}
{/*					style={styles.button}*/}
{/*					onPress={() => navigation.navigate("Profile")}*/}
{/*				/>*/}
{/*=======*/}
				{/*<Button*/}
				{/*	title="Challenges"*/}
				{/*	style={styles.button}*/}
				{/*	onPress={() => navigation.navigate("Challenges")}/>*/}

				{/*<Button*/}
				{/*	title="Profile"*/}
				{/*	style={styles.button}*/}
				{/*	onPress={() => navigation.navigate("Profile")}/>*/}
{/*>>>>>>> 4d8f9f6 (fix camera)*/}

				{allPosts.slice(0, numPostsToShow).map((post: Post) => {
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
