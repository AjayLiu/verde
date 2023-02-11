import React from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Swiper from "react-native-screens-swiper";
import { RouterProps } from "../types";
import Feed from "@screens/Feed";
import Profile from "@screens/Profile";
import Challenges from "@screens/Challenges";
import Settings from "@screens/Settings"
import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";
import colors from "@styles/colors";

export default function HomeSwipe({ navigation }: RouterProps) {
	const data = [
		{
			component: Challenges,
			props: { navigation },
		},
		{
			component: Feed,
			props: { navigation },
		},
		{
			component: Profile,
			props: { navigation },
		},
		// {
		// 	component: Settings,
		// 	props: { navigation },
		// },
	];

	return (
		<View style={[styles.h100, colors.offBlackBG]}>
			<View style={[styles.h5, colors.offBlackBG]}></View>
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
};
