import React, { useState, useEffect } from "react";
import { Text, View, Image, StyleSheet, Dimensions } from "react-native";
import ProfilePicture from "@components/ProfilePicture";
import Points from "@components/Points";
import { FirestoreUser, Post } from "src/types";
import { useUser } from "@utils/hooks/useUser";

const dimensions = Dimensions.get("window");

type PostProps = {
	post: Post;
};

const PostComponent = (props: PostProps) => {
	const { getUserFromFirestore } = useUser();
	const [author, setAuthor] = useState<FirestoreUser>();

	useEffect(() => {
		const getAuthorInfo = async () => {
			const result = await getUserFromFirestore(props.post.authorUid);
			setAuthor(result);
		};

		getAuthorInfo();
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
		<View style={[styles.column, styles.marB]}>
			<View style={[styles.row, styles.marB]}>
				<View style={[styles.growOne, styles.alignCenter]}>
					<ProfilePicture size={35} user={author} />
				</View>
				<View style={[styles.column, styles.growTen]}>
					<View>
						<Text style={styles.fontBold}>
							{author?.displayName}
						</Text>
					</View>
					<View>
						{/* TODO: pull actual points */}
						<Points user={author} />
					</View>
				</View>
				<View
					style={[
						styles.growOne,
						styles.alignCenter,
						styles.justifyCenter,
					]}
				>
					{/* TODO: pull post challenge's points */}
					<Text>post: 10</Text>
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
			<View style={styles.column}>
				<View style={styles.row}>
					<View
						style={[
							styles.growFive,
							styles.marB,
							styles.alignCenter,
							styles.justifyCenter,
						]}
					>
						<Text style={styles.fontLarge}>
							<Text style={styles.fontBold}>
								{author?.displayName}
							</Text>{" "}
							completed a challenge!
						</Text>
					</View>
					<View style={styles.growOne}>
						<Text style={styles.fontLarge}>🌲</Text>
					</View>
				</View>
				<View style={[styles.marB, styles.alignCenter]}>
					<Text
						style={[styles.marB, styles.fontSmall, styles.fontGray]}
					>
						{getPostTime()}
					</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	// flex direction (controls main axis)
	column: {
		flexDirection: "column",
	},
	row: {
		flexDirection: "row",
	},
	// main axis
	justifyCenter: {
		justifyContent: "center",
	},
	// cross axis
	alignCenter: {
		alignItems: "center",
	},
	alignEnd: {
		alignItems: "flex-end",
	},
	// flex-grow properties
	growOne: {
		flexGrow: 1,
	},
	growFive: {
		flexGrow: 5,
	},
	growTen: {
		flexGrow: 10,
	},
	// use this for all margins
	marB: {
		marginBottom: 5,
	},
	// sizing
	image: {
		width: dimensions.width,
		height: dimensions.width,
	},
	// text
	fontSmall: {
		fontSize: 11,
	},
	fontLarge: {
		fontSize: 20,
	},
	fontGray: {
		color: "gray",
	},
	fontBold: {
		fontWeight: "bold",
	},
});

export default PostComponent;
