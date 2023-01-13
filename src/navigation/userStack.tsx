import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "@screens/Home";
import CameraScreen from "@screens/CameraScreen";

const Stack = createStackNavigator();

export default function UserStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Home" component={HomeScreen} />
			<Stack.Screen name="Camera" component={CameraScreen} />
		</Stack.Navigator>
	);
}
