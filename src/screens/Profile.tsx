import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { RouterProps } from "src/types";
import { useUser } from "@utils/hooks/useUser";
import ProfilePicture from "@components/ProfilePicture";
import AuthPoints from "@components/AuthPoints";
import { Calendar } from "react-native-calendars";

export default function HomeScreen({ navigation }: RouterProps) {
	const { authUser } = useUser();

	return (
		<View style={styles.container}>
			<Text>{authUser?.displayName}</Text>

			<ProfilePicture size={150} style={styles.pfp} />

			<AuthPoints />

			<View style={styles.calendarContainer}>
				<Calendar
					initialDate={"2023-01-12"}
					// TODO: replace maxDate with today's date
					// maxDate={"2023-01-23"}
					hideArrows={true}
					disableMonthChange={true}
					hideDayNames={true}
					renderHeader={() => {
						return null;
					}}
					markingType={"period"}
					// TODO: replace this placeholder data with data from auth user
					markedDates={{
						"2023-01-13": { startingDay: true, color: "#A7E0A2" },
						"2023-01-14": { color: "#A7E0A2" },
						"2023-01-15": { color: "#A7E0A2" },
						"2023-01-16": { endingDay: true, color: "#A7E0A2" },
					}}
					style={styles.calendar}
				/>
			</View>

			<Button
				title="Home"
				style={styles.button}
				onPress={() => navigation.navigate("Home")}
			/>

			{/* <Button
				title="Calendar"
				style={styles.button}
				onPress={() => navigation.navigate("Calendar")}
			/>

			<Button
				title="Friends"
				style={styles.button}
				onPress={() => navigation.navigate("Friends")}
			/> */}

			<Button
				title="Settings"
				style={styles.button}
				onPress={() => navigation.navigate("Settings")}
			/>
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
	},
	calendarContainer: {
		width: "100%",
	},
	calendar: {
		marginTop: 30,
		paddingLeft: 0,
		paddingRight: 0,
	},
});
