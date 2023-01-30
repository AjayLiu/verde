import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { FirestoreUser, RouterProps } from "src/types";
import { useUser } from "@utils/hooks/useUser";
import ProfilePicture from "@components/ProfilePicture";
import AuthPoints from "@components/AuthPoints";
import { Post } from "src/types";
import { usePost } from "@utils/hooks/usePost";
import { Calendar } from "react-native-calendars";
<<<<<<< HEAD
import { MarkedDates } from "react-native-calendars/src/types";
import { getCalendarDateString } from "react-native-calendars/src/services";
import { Timestamp } from "firebase/firestore";
=======
import Ionicons from '@expo/vector-icons/Ionicons';
>>>>>>> ca16e87 (fix camera)

export default function Profile({ navigation }: RouterProps) {
	const { authUser, fireUser } = useUser();
	const { getAllPosts } = usePost();
	const [posts, setPosts] = React.useState<Post[]>([]);

	const fetchAllPosts = async () => {
		const allPosts = await getAllPosts();
		setPosts(allPosts);
	};

	useEffect(() => {
		fetchAllPosts();
	}, []);

	function getDates() {
		const authPosts: Post[] = [];
		posts.forEach((post) => {
			if (post.authorUid === authUser?.uid) {
				authPosts.push(post);
			}
		});

		// Uncomment for testing
		// authPosts.push({
		// 	timestamp: Timestamp.fromDate(new Date(2023, 0, 1)),
		// } as Post);
		// authPosts.reverse();

		const dates: MarkedDates = {};
		let starting = false;
		let ending = false;

		authPosts.reverse().forEach((post, index) => {
			const timestamp = post.timestamp.toDate();

			if (index === 0) {
				starting = true;
			} else {
				starting =
					timestamp.getDate() - 1 !==
					authPosts[index - 1].timestamp.toDate().getDate();
			}
			if (index === authPosts.length - 1) {
				ending = true;
			} else {
				ending =
					timestamp.getDate() + 1 !==
					authPosts[index + 1].timestamp.toDate().getDate();
			}

			const date: string = getCalendarDateString(timestamp);

			dates[date] = {
				color: "#A7E0A2",
				startingDay: starting,
				endingDay: ending,
			};
		});

		return dates;
	}

	return (
		<View style={styles.container}>

			<Ionicons
				name="settings-outline"
				iconStyle = {styles.icon}
				size={32}
				color={"#00CC4B"}
				onPress={() => navigation.navigate("Settings")}
			/>

			<ProfilePicture size={150} />
			<Text>Score: {fireUser?.score}</Text>

			<View style={styles.calendarContainer}>
				<Calendar
					// initialDate={"2023-01-12"}
					maxDate={getCalendarDateString(new Date())}
					hideArrows={true}
					disableMonthChange={true}
					hideDayNames={true}
					// renderHeader={() => {
					// 	return null;
					// }}
					markingType={"period"}
					markedDates={getDates()}
					style={styles.calendar}
				/>
			</View>

<<<<<<< HEAD
			{/* <Button
				title="Home"
				style={styles.button}
				onPress={() => navigation.navigate("Home")}
			/> */}
=======
			{/*<Button*/}
			{/*	title="Home"*/}
			{/*	style={styles.button}*/}
			{/*	onPress={() => navigation.navigate("Home")}*/}
			{/*/>*/}
>>>>>>> ca16e87 (fix camera)

			{/* <Button
				title="Calendar"
				style={styles.button}
				onPress={() => navigation.navigate("Calendar")}
			/> */}

			{/* <Button
				title="Friends"
				style={styles.button}
				onPress={() => navigation.navigate("Friends")}
			/> */}
<<<<<<< HEAD

			{/* <Button
				title="Settings"
				style={styles.button}
				onPress={() => navigation.navigate("Settings")}
			/> */}
=======
>>>>>>> ca16e87 (fix camera)
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	button: {
		marginTop: 10,
	},
	pfp: {
		marginTop: 30,
		marginBottom: 15,
	},
	calendarContainer: {
		width: "100%",
	},
	calendar: {
		marginTop: 30,
		paddingLeft: 0,
		paddingRight: 0,
	},
	icon: {

	},
});
