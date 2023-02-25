import React from "react";
import { StyleSheet, View } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import FeedScreen from "@screens/Feed";
import CameraScreen from "@screens/CameraScreen";
import Profile from "@screens/Profile";
import Friends from "@screens/Friends";
import Calendar from "@screens/Calendar";
import Challenges from "@screens/Challenges";
import Settings from "@screens/Settings";
import HomeSwipe from "@screens/HomeSwiper";
import DeleteAccountScreen from "@screens/DeleteAccount";

const Stack = createStackNavigator();

export default function UserStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				headerBackTitleVisible: false,
			}}
		>
			<Stack.Screen
				name="HomeSwiper"
				component={HomeSwipe}
				options={{
					gestureDirection: "horizontal-inverted",
				}}
			/>
			<Stack.Screen name="Feed" component={FeedScreen} />
			<Stack.Screen
				name="Profile"
				component={Profile}
				options={{
					title: "Profile",
				}}
			/>
			<Stack.Screen
				name="Friends"
				component={Friends}
				options={{ title: "Friends" }}
			/>
			<Stack.Screen
				name="Camera"
				component={CameraScreen}
				options={{ title: "Camera" }}
			/>
			<Stack.Screen
				name="Calendar"
				component={Calendar}
				options={{ title: "Calendar" }}
			/>
			<Stack.Screen
				name="Challenges"
				component={Challenges}
				options={{ title: "Challenges" }}
			/>
			<Stack.Screen
				name="Settings"
				component={Settings}
				options={{ title: "Settings" }}
			/>
			<Stack.Screen
				name="DeleteAccount"
				component={DeleteAccountScreen}
				options={{ title: "Delete Account" }}
			/>
		</Stack.Navigator>
	);
}
