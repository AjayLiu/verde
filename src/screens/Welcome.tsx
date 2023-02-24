import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Button } from "react-native-elements";
import colors from "@styles/colors";
import flex from "@styles/flexbox";
import font from "@styles/font";

const WelcomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
	return (
		<View style={[styles.container, colors.offBlackBG]}>
			<View style={[styles.buttons, flex.column, flex.justifyCenter]}>
				<Text style={[colors.lightGreen, font.sizeTitle, font.textCenter, font.fontItalic]}>
					VERDE
				</Text>
				<Button
					title="SIGN IN"
					titleStyle={font.fontBold}
					buttonStyle={[styles.button, colors.darkGreenBG]}
					onPress={() => navigation.navigate("Sign In")}
				/>
				<Button
					title="SIGN UP"
					titleStyle={[
						font.fontBold,
						colors.lightGreen
					 ]}
					type="outline"
					buttonStyle={[styles.button, styles.buttonOutline]}
					onPress={() => navigation.navigate("Sign Up")}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 20,
		alignItems: "center",
		justifyContent: "center",
	},

	buttons: {
		flex: 1,
		top: -25,
	},

	button: {
		marginTop: 10,
		borderRadius: 12.5,
		paddingHorizontal: 50,
		height: 50,
	},

	buttonOutline: {
		borderWidth: 2,
		borderColor: '#00cc4b'
	}
});

export default WelcomeScreen;
