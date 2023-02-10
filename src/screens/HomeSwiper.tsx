import React from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Swiper from "react-native-screens-swiper";
import { RouterProps } from "../types";
import Feed from "@screens/Feed";
import Profile from "@screens/Profile";
import Challenges from "@screens/Challenges";
import Ionicons from '@expo/vector-icons/Ionicons';
import {View} from "react-native";

export default function HomeSwipe({ navigation }: RouterProps) {
	const data = [
		{
			tabLabel: <Ionicons name="checkmark-done-outline"/>,
			component: Challenges,
			props: { navigation },
		},
		{
			tabLabel: <Ionicons name="albums-outline"/>,
			component: Feed,
			props: { navigation },
		},
		{
			tabLabel: <Ionicons name="person-circle-outline"/>,
			component: Profile,
			props: { navigation },
		},
	];

	return (
		<View
			style={styles.marTop}
		>
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
		backgroundColor: "red",
	},
	pillContainer: {
		height: 10,
	},
	borderActive: {
		borderColor: '#00CC4B',
	},
	pillLabel: {
		color: '#00CC4B',
	},
	activeLabel: {
		color: '#ba2d65',
	},


};

const styles = {
	marTop: {
		marginTop: 25,
		height: "100%",
	}
}