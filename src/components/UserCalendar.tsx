import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Post } from "src/types";
import { useUser } from "@utils/hooks/useUser";
import { usePost } from "@utils/hooks/usePost";
import { getCalendarDateString } from "react-native-calendars/src/services";
import { MarkedDates } from "react-native-calendars/src/types";
import { Calendar } from "react-native-calendars";

const UserCalendar = () => {
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
		<Calendar
			// initialDate={"2023-01-12"}
			maxDate={getCalendarDateString(new Date())}
			// hideArrows={true}
			disableMonthChange={true}
			hideDayNames={true}
			// renderHeader={() => {
			// 	return null;
			// }}
			markingType={"period"}
			markedDates={getDates()}
		/>
	);
};

const styles = StyleSheet.create({});

export default UserCalendar;
