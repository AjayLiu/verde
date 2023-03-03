import React, { useState, useEffect } from "react";
import { Text, View, Image, StyleSheet, Dimensions } from "react-native";
import ProfilePicture from "@components/ProfilePicture";
import { Challenge, FirestoreUser, Post } from "src/types";
import { useUser } from "@utils/hooks/useUser";
import { useChallenge } from "@utils/hooks/useChallenge";
import colors from "@styles/colors";
import flex from "@styles/flexbox";
import font from "@styles/font";
import { usePost } from "@utils/hooks/usePost";
import { TouchableOpacity } from "react-native";

const dimensions = Dimensions.get("window");

type PostProps = {
	post: Post;
	reloadPosts: () => void;
};

const PostComponent = (props: PostProps) => {
	const { getUserFromFirestore, authUser } = useUser();
	const { getChallenge } = useChallenge();
	const { likePost } = usePost();
	const [author, setAuthor] = useState<FirestoreUser>();
	const [challenge, setChallenge] = useState<Challenge>();

	useEffect(() => {
		const getAuthorInfo = async () => {
			const result = await getUserFromFirestore(props.post.authorUid);
			if (result != -1) setAuthor(result);
		};

		const getChallengeInfo = async () => {
			const result = await getChallenge(props.post.challengeUid);
			setChallenge(result);
		};

		getAuthorInfo();
		getChallengeInfo();
	}, [props.post]);

	function getPostTime(): string {
		const postTime = props.post.timestamp.toDate().getTime();
		const currentTime = new Date().getTime();
		const timeDiff = currentTime - postTime;
		const seconds = Math.floor(timeDiff / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
		const weeks = Math.floor(days / 7);
		const months = Math.floor(weeks / 4);
		const years = Math.floor(months / 12);

		if (seconds < 60) {
			return "Just now";
		} else if (minutes == 1) {
			return `${minutes} minute ago`;
		} else if (minutes < 60) {
			return `${minutes} minutes ago`;
		} else if (hours == 1) {
			return `${hours} hour ago`;
		} else if (hours < 24) {
			return `${hours} hours ago`;
		} else if (days == 1) {
			return `${days} day ago`;
		} else if (days < 7) {
			return `${days} days ago`;
		} else if (weeks == 1) {
			return `${weeks} week ago`;
		} else if (weeks < 4) {
			return `${weeks} weeks ago`;
		} else if (months == 1) {
			return `${months} month ago`;
		} else if (months < 12) {
			return `${months} months ago`;
		} else if (years == 1) {
			return `${years} year ago`;
		} else {
			return `${years} years ago`;
		}
	}

	// Double tap detection
	let lastPress = 0;
	const onPostPress = () => {
		const time = new Date().getTime();
		const delta = time - lastPress;

		const DOUBLE_PRESS_DELAY = 400;
		if (delta < DOUBLE_PRESS_DELAY) {
			// Success double press
			likeThePost();
		}
		lastPress = time;
		return true;
	};

	const likeThePost = async () => {
		await likePost(props.post.uid);
		if (alreadyLiked) {
			// Already liked, so unlike
			setAlreadyLiked(false);
		} else {
			setAlreadyLiked(true);
		}
		props.reloadPosts();
	};

	const [alreadyLiked, setAlreadyLiked] = useState(false);
	useEffect(() => {
		props.post.likes.forEach((like) => {
			if (like.authorUid == authUser?.uid) {
				setAlreadyLiked(true);
				return;
			}
		});
	}, [props.post, authUser]);

	return (
		<View style={[flex.column, styles.marB, styles.padB]}>
			<View style={[flex.row, styles.marB]}>
				<View style={[flex.growOne, flex.alignCenter]}>
					<ProfilePicture size={35} user={author} />
				</View>
				<View style={[flex.column, flex.growTen]}>
					<View>
						<Text style={[font.fontBold, colors.offWhite]}>
							{author?.displayName}
						</Text>
					</View>
					<View>
						<Text style={colors.offWhite}>
							{(author?.score || 0) + " points"}
						</Text>
					</View>
				</View>
				<View
					style={[flex.growOne, flex.alignCenter, flex.justifyCenter]}
				>
					<Text style={[colors.lightGreen, font.fontBold]}>
						+{challenge?.points || 0}
					</Text>
				</View>
			</View>
			<View style={[styles.marB]} onStartShouldSetResponder={onPostPress}>
				<Image
					style={[styles.image, styles.marB]}
					source={{
						uri:
							props.post.imgUrl ||
							// loading image
							"https://media.istockphoto.com/id/1288130003/vector/loading-progress-circle-in-black-and-white.jpg?s=612x612&w=0&k=20&c=eKCLbwdoJy5a7oofoh9AEt6Mp7dc1p79LCMmR-eNM0U=", // loading image
					}}
				/>
			</View>
			<View style={flex.column}>
				<View style={flex.row}>
					<View
						style={[
							flex.basis85,
							styles.marB,
							flex.alignCenter,
							flex.justifyCenter,
						]}
					>
						<Text
							style={[
								font.sizeXL,
								font.textCenter,
								colors.offWhite,
							]}
						>
							<Text style={font.fontBold}>
								{challenge?.title || "a challenge"}
							</Text>
							!
						</Text>
					</View>
					<TouchableOpacity
						style={[
							flex.basis15,
							flex.row,
							flex.justifyCenter,
							flex.alignCenter,
							styles.marB,
						]}
						onPress={likeThePost}
					>
						<Text style={[font.sizeL, colors.offWhite]}>
							{props.post.likes.length}
						</Text>
						{alreadyLiked ? (
							// ALREADY LIKED
							<Image
								style={[styles.small_image]}
								source={require("@assets/treefilled.png")}
							/>
						) : (
							// HAVEN'T LIKED YET (slightly transparent)
							<Image
								style={[styles.small_image]}
								source={require("@assets/tree-icon.png")}
							/>
							// <Text style={[font.sizeXL, { opacity: 0.5 }]}>
							// 	ya
							// </Text>
						)}
					</TouchableOpacity>
				</View>
				<View
					style={[
						flex.alignCenter,
						{
							marginBottom: 20,
						},
					]}
				>
					<Text style={[styles.marB, font.sizeS, colors.gray]}>
						{getPostTime()}
					</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	// use this for all margins
	marB: {
		marginBottom: 5,
	},
	marT: {
		marginTop: 5,
	},
	padB: {
		paddingBottom: 1,
	},
	// sizing
	image: {
		width: dimensions.width,
		height: dimensions.width,
	},
	small_image: {
		width: 20,
		height: 20,
		marginLeft: 5,
	},
});

export default PostComponent;
