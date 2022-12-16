import React from "react";
import { ThemeProvider } from "react-native-elements";
import "@config/firebase";
import RootNavigation from "@navigation/index";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
	return (
		<NavigationContainer>
			<ThemeProvider>
				<RootNavigation />
			</ThemeProvider>
		</NavigationContainer>
	);
}
