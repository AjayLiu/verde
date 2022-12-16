import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "@screens/Welcome";
import SignInScreen from "@screens/SignInScreen";
import SignOutScreen from "@screens/SignUpScreen";

const Stack = createStackNavigator();

export default function AuthStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Welcome" component={WelcomeScreen} />
			<Stack.Screen name="Sign In" component={SignInScreen} />
			<Stack.Screen name="Sign Up" component={SignOutScreen} />
		</Stack.Navigator>
	);
}
