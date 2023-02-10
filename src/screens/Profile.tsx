import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Post, RouterProps } from "src/types";
import { useUser } from "@utils/hooks/useUser";
import ProfilePicture from "@components/ProfilePicture";
import Ionicons from "@expo/vector-icons/Ionicons";
import UserCalendar from "@components/UserCalendar";
import font from "@styles/font";
import flex from "@styles/flexbox";
import { usePost } from "@utils/hooks/usePost";

export default function Profile({ navigation }: RouterProps) {
	const { fireUser } = useUser();
	const { getAllPosts } = usePost();
	const [posts, setPosts] = React.useState<Post[]>([]);

	const fetchAllPosts = async () => {
		const allPosts = await getAllPosts();
		setPosts(allPosts);
	};

	useEffect(() => {
		fetchAllPosts();
	}, []);

	function getNumPosts() {
		let num = 0;
		posts.forEach((post) => {
			if (post.authorUid === fireUser?.uid) {
				num++;
			}
		});
		return num;
	}

	return (
		<View
			style={[
				styles.container,
				flex.column,
				flex.alignCenter,
				flex.justifyStart,
			]}
		>
			<Ionicons
				name="settings-outline"
				iconStyle={styles}
				size={32}
				color={"#00CC4B"}
				onPress={() => navigation.navigate("Settings")}
			/>
			<ProfilePicture size={100} style={[styles.marB, styles.marT]} />
			<Text style={[font.fontBold, font.sizeXL, styles.marB]}>
				{fireUser?.displayName}
			</Text>

			<View
				style={[
					styles.width100,
					flex.row,
					flex.justifyEvenly,
					styles.marT,
				]}
			>
				<View style={flex.column}>
					<Text style={[font.textCenter, font.sizeXL]}>
						{fireUser?.score}
					</Text>
					<Text style={[font.sizeL]}>points</Text>
				</View>
				<View style={flex.column}>
					<Text style={[font.textCenter, font.sizeXL]}>
						{getNumPosts()}
					</Text>
					<Text style={[font.sizeL]}>
						{getNumPosts() == 1 ? "post" : "posts"}
					</Text>
				</View>
			</View>

			<View style={[styles.width100, styles.marT]}>
				<UserCalendar />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	marB: {
		marginBottom: 5,
	},
	marT: {
		marginTop: 5,
	},
	container: {
		backgroundColor: "#fff",
		height: "100%",
	},
	width100: {
		width: "100%",
	},
});
