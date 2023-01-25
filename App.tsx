import React, { useState } from "react";
import { ThemeProvider } from "react-native-elements";
import "@config/firebase";
import RootNavigation from "@navigation/index";
import { NavigationContainer } from "@react-navigation/native";
import UsernameContext from "./src/contexts/UsernameContext";

export default function App() {
	const [hasPickedUsername, setHasPickedUsername] = useState(false);
	return (
		<NavigationContainer>
			<ThemeProvider>
				<UsernameContext.Provider
					value={{ hasPickedUsername, setHasPickedUsername }}
				>
					<RootNavigation />
				</UsernameContext.Provider>
			</ThemeProvider>
		</NavigationContainer>
	);
}
