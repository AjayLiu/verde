import React, { useState, useEffect } from "react";
import { Text, View, Image, StyleSheet, Dimensions } from "react-native";
import ProfilePicture from "@components/ProfilePicture";
import { Challenge, FirestoreUser, Post } from "src/types";
import { useUser } from "@utils/hooks/useUser";
import { useChallenge } from "@utils/hooks/useChallenge";
import colors from "@styles/colors";
import flex from "@styles/flexbox";
import font from "@styles/font";

const dimensions = Dimensions.get("window");

type PostProps = {
	post: Post;
};

const PostComponent = (props: PostProps) => {
	const { getUserFromFirestore } = useUser();
	const { getChallenge } = useChallenge();
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
	}, []);

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

	return (
		<View style={[flex.column, styles.marB]}>
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
							{author?.score || 0} points
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
			<View style={[styles.marB]}>
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
								{author?.displayName}
							</Text>{" "}
							completed{" "}
							<Text style={font.fontBold}>
								{challenge?.title || "a challenge"}
							</Text>
							!
						</Text>
					</View>
					<View style={[flex.basis15, flex.row, flex.justifyCenter]}>
						<Text style={[font.sizeXL, colors.offWhite]}>
							{props.post.likes.length}
						</Text>
						<Text style={[font.sizeXL]}>🌲</Text>
					</View>
				</View>
				<View style={[styles.marB, flex.alignCenter]}>
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
	// sizing
	image: {
		width: dimensions.width,
		height: dimensions.width,
	},
});

export default PostComponent;
