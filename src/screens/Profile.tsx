import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Post, RouterProps, Challenge } from "src/types";
import { useUser } from "@utils/hooks/useUser";
import ProfilePicture from "@components/ProfilePicture";
import Ionicons from "@expo/vector-icons/Ionicons";
import UserCalendar from "@components/UserCalendar";
import { useChallenge } from "@utils/hooks/useChallenge";
import font from "@styles/font";
import flex from "@styles/flexbox";
import colors from "@styles/colors";
import { usePost } from "@utils/hooks/usePost";
import { DateData } from "react-native-calendars";
import { getCalendarDateString } from "react-native-calendars/src/services";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { useCallback } from "react";

export default function Profile({ navigation }: RouterProps) {
	const { fireUser, fetchFireUser } = useUser();
	const { getAllPosts } = usePost();
	const { getChallenge } = useChallenge();
	const [challenge, setChallenge] = useState<Challenge>();
	const [posts, setPosts] = useState<Post[]>([]);
	const [day, setDay] = useState<DateData>({
		year: new Date().getFullYear(),
		month: new Date().getMonth() + 1,
		day: new Date().getDate(),
		timestamp: new Date().getTime(),
		dateString: getCalendarDateString(new Date()),
	});

	const [refreshing, setRefreshing] = React.useState(false);

	const [displayName, setDisplayName] = useState("");
	const [pfp, setPfp] = useState("");
	const [score, setScore] = useState(0);

	useEffect(() => {
		setDisplayName(fireUser?.displayName || "");
		if (fireUser?.photoUrl) setPfp(fireUser?.photoUrl);
		setScore(fireUser?.score || 0);
	}, [fireUser?.displayName, fireUser?.photoUrl]);

	const onRefresh = useCallback(async () => {
		await fetchAllPosts();
		await fetchFireUser();
		setRefreshing(false);
	}, []);

	const fetchAllPosts = async () => {
		const allPosts = await getAllPosts();
		setPosts(allPosts);
	};

	const getChallengeForDay = async (day: DateData) => {
		let uid = "";
		posts.forEach((post) => {
			const timestamp = post.timestamp.toDate();
			const date: string = getCalendarDateString(timestamp);
			if (date === day.dateString && post.authorUid == fireUser?.uid) {
				uid = post.challengeUid;
			}
		});
		setChallenge(uid == "" ? undefined : await getChallenge(uid));
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

	function dayPress(date: DateData) {
		setDay(date);
		getChallengeForDay(date);
	}

	function dateToString(day: DateData) {
		const date = new Date(day.year, day.month - 1, day.day);
		const dayOfWeek = date.getDay();
		const days = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];

		return (
			days[dayOfWeek] +
			", " +
			date.toLocaleString("en-US", { month: "long", day: "numeric" })
		);
	}

	return (
		<View style={{ flex: 1 }}>
			<View style={[styles.width100, flex.row, flex.justifyEnd]}>
				{/* <Ionicons
    name="albums"
    size={22.5}
    color={"#00CC4B"}
    style={{ opacity: 0.25 }}
/> */}

				<Ionicons
					name="settings-outline"
					style={styles.marR}
					size={30}
					color={"#00CC4B"}
					onPress={() => navigation.navigate("Settings")}
				/>
			</View>

			<ScrollView
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					></RefreshControl>
				}
			>
				<View
					style={[
						styles.height100,
						colors.offBlackBG,
						flex.column,
						flex.alignCenter,
						flex.justifyStart,
					]}
				>
					<ProfilePicture
						size={100}
						style={[styles.marB, styles.marT]}
						image={pfp}
					/>
					<Text
						style={[
							font.fontBold,
							font.sizeXL,
							styles.marT,
							styles.marB,
							colors.offWhite,
						]}
					>
						{displayName}
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
							<Text
								style={[
									font.textCenter,
									font.sizeXL,
									colors.offWhite,
								]}
							>
								{score}
							</Text>
							<Text style={[font.sizeL, colors.offWhite]}>
								points
							</Text>
						</View>
						<View style={flex.column}>
							<Text
								style={[
									font.textCenter,
									font.sizeXL,
									colors.offWhite,
								]}
							>
								{getNumPosts()}
							</Text>
							<Text style={[font.sizeL, colors.offWhite]}>
								{getNumPosts() == 1 ? "post" : "posts"}
							</Text>
						</View>
					</View>

					<View style={[styles.width100, styles.marT]}>
						<UserCalendar
							posts={posts}
							dayPress={dayPress}
							selected={day}
						/>
					</View>
					<View style={[styles.width100, styles.marL, styles.marT]}>
						<Text
							style={[
								styles.width100,
								font.textCenter,
								colors.gray,
								styles.marB,
								{ marginBottom: 10 },
							]}
						>
							↑ Tap a day to see completed challenges! ↑
						</Text>
						<Text
							style={[
								colors.offWhite,
								font.sizeXML,
								font.fontBold,
								styles.marL,
								styles.marT,
							]}
						>
							{dateToString(day)}
						</Text>
						<Text
							style={[
								colors.offWhite,
								styles.marL,
								font.sizeL,
								styles.marT,
								styles.width90,
							]}
						>
							{challenge === undefined ? (
								"No challenge completed"
							) : (
								<Text>
									<Text>You completed </Text>
									<Text style={[font.fontBold]}>
										{challenge.title}
									</Text>
									<Text> and earned </Text>
									<Text style={[colors.lightGreen]}>
										{challenge.points} points
									</Text>
									<Text>!</Text>
								</Text>
							)}
						</Text>
					</View>
					{/* Uncomment below for button to send you to challenge page (needs to be debugged) */}
					{/* <View>
    {challenge === undefined ? (
        <TouchableOpacity
            style={[
                flex.row,
                flex.alignCenter,
                colors.blueBG,
                { paddingVertical: 10 },
                { paddingHorizontal: 16 },
                { borderRadius: 12 },
                { marginTop: 15 },
            ]}
            onPress={() =>
                navigation.reset({
                    // index: 0,
                    routes: [{ name: "HomeSwiper" }],
                })
            }
        >
            <Ionicons
                type="font-awesome"
                name="menu"
                color="white"
                size={25}
            ></Ionicons>
            <Text
                style={[
                    font.textCenter,
                    font.sizeL,
                    font.fontBold,
                    colors.offWhite,
                    { marginLeft: 8 },
                ]}
            >
                CHALLENGES
            </Text>
        </TouchableOpacity>
    ) : (
        <View></View>
    )}
</View> */}
				</View>
			</ScrollView>
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
	marR: {
		marginRight: 15,
	},
	marL: {
		marginLeft: 15,
	},
	width100: {
		width: "100%",
	},
	width90: {
		width: "90%",
	},
	height100: {
		height: "100%",
	},
});
