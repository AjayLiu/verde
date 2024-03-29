import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "@screens/Welcome";
import SignInScreen from "@screens/SignInScreen";
import SignUpScreen from "@screens/SignUpScreen";
import PickUsernameScreen from "@screens/PickUsernameScreen";
import ForgotPassword from "@screens/ForgotPassword";

const Stack = createStackNavigator();

export default function AuthStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		// screenOptions={{ headerStyle: { backgroundColor: 'papayawhip' } }}
		>
			<Stack.Screen name="VERDE" component={WelcomeScreen} />
			<Stack.Screen name="Sign In" component={SignInScreen} />
			<Stack.Screen name="Sign Up" component={SignUpScreen} />
			<Stack.Screen name="Forgot Password" component={ForgotPassword} />
			<Stack.Screen
				name="PickUsername"
				component={PickUsernameScreen}
				options={{ title: "Pick Username" }}
			/>
		</Stack.Navigator>
	);
}
