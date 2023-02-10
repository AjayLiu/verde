import React from "react";
import { Post } from "src/types";
import { useUser } from "@utils/hooks/useUser";
import { getCalendarDateString } from "react-native-calendars/src/services";
import { MarkedDates } from "react-native-calendars/src/types";
import { Calendar } from "react-native-calendars";

type UserCalendarProps = {
	posts: Post[];
};

const UserCalendar = (props: UserCalendarProps) => {
	const { fireUser } = useUser();

	function getDates() {
		const authPosts: Post[] = [];
		props.posts.forEach((post) => {
			if (post.authorUid === fireUser?.uid) {
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
				color: "#138a36", // dark green (hard coded from colors.ts)
				startingDay: starting,
				endingDay: ending,
			};
		});

		return dates;
	}

	return (
		<Calendar
			maxDate={getCalendarDateString(new Date())}
			// hideArrows={true}
			disableMonthChange={true}
			hideDayNames={true}
			// renderHeader={() => {
			// 	return null;
			// }}
			markingType={"period"}
			markedDates={getDates()}
			// hard coding colors from colors.ts because not sure what else to do
			theme={{
				calendarBackground: "#232020", // off black
				dayTextColor: "#e2e4f6", // off white
				textDisabledColor: "gray",
				arrowColor: "#138a36", // dark green
				monthTextColor: "#e2e4f6", // off white
			}}
		/>
	);
};

export default UserCalendar;
