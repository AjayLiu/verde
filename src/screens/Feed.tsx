import React, { Component, useCallback, useContext, useEffect } from "react";
import { NativeScrollEvent, StyleSheet, Text, View } from "react-native";
import { useUser } from "@hooks/useUser";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import PostComponent from "@components/PostComponent";
import { Post, RouterProps } from "src/types";
import { usePost } from "@utils/hooks/usePost";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import flex from "@styles/flexbox";
import colors from "@styles/colors";
import font from "@styles/font";

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
		<View>
			<View
				style={[
					flex.alignCenter,
					flex.justifyCenter,
					colors.offBlackBG,
					styles.marB,
				]}
			>
				<Text
					style={[
						colors.lightGreen,
						font.sizeXML,
						font.textCenter,
						// font.fontItalic,
						font.fontBold,
						styles.logo,
					]}
				>
					VERDE
				</Text>
			</View>
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
				style={styles.marT}
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
						return (
							<PostComponent
								key={post.uid}
								post={post}
								reloadPosts={() => {
									fetchAllPosts();
								}}
							/>
						);
					})}
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	padding: {
		paddingVertical: 10,
	},
	logo: {
		top: 0,
		position: "absolute",
	},
	marT: {
		marginTop: 37,
	},
	marB: {
		marginBottom: 2,
	},
});
