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
import flex from "@styles/flexbox";
import colors from "@styles/colors";

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
			<View
				style={[
					flex.alignCenter,
					flex.justifyCenter,
					colors.offBlackBG,
				]}
			>
				{/* <Text style={[colors.offWhite]}>
					Welcome {authUser?.displayName}!
				</Text> */}

				{allPosts.slice(0, numPostsToShow).map((post: Post) => {
					return <PostComponent key={post.uid} post={post} />;
				})}
			</View>
		</ScrollView>
	);
}
