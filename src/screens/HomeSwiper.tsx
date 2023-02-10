import React from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Swiper from "react-native-screens-swiper";
import { RouterProps } from "../types";
import Feed from "@screens/Feed";
import Profile from "@screens/Profile";
import Challenges from "@screens/Challenges";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";

export default function HomeSwipe({ navigation }: RouterProps) {
	const data = [
		{
			tabLabel: <Ionicons name="checkmark-done-outline" />,
			component: Challenges,
			props: { navigation },
		},
		{
			tabLabel: <Ionicons name="albums-outline" />,
			component: Feed,
			props: { navigation },
		},
		{
			tabLabel: <Ionicons name="person-circle-outline" />,
			component: Profile,
			props: { navigation },
		},
	];

	return (
		<View style={styles.h100}>
			<View style={[styles.h5, styles.bgWhite]}></View>
			<Swiper
				data={data}
				isStaticPills={true}
				style={swipe_styles}
				initialScrollIndex={1}
			/>
		</View>
	);
}

const swipe_styles = {
	container: {
		padding: 50,
	},
	pillContainer: {
		display: "none",
	},
};

const styles = {
	h100: {
		height: "100%",
	},
	h5: {
		height: "5%",
	},
	bgWhite: {
		backgroundColor: "white",
	},
};
