import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import {
	EmailAuthProvider,
	getAuth,
	reauthenticateWithCredential,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { StackScreenProps } from "@react-navigation/stack";
import UsernameContext from "../contexts/UsernameContext";
import flexbox from "@styles/flexbox";
import colors from "@styles/colors";
import font from "@styles/font";
import { useUser } from "@utils/hooks/useUser";
import Ionicons from "@expo/vector-icons/Ionicons";

const auth = getAuth();

const SignInScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
	const [value, setValue] = React.useState({
		email: "",
		password: "",
		error: "",
	});

	const { hasPickedUsername, setHasPickedUsername } =
		useContext(UsernameContext);

	const { authUser, fireUser, deleteUserFromFirestore } = useUser();

	async function signIn() {
		if (value.email === "" || value.password === "") {
			setValue({
				...value,
				error: "Email and password are mandatory.",
			});
			return;
		}

		try {
			await signInWithEmailAndPassword(auth, value.email, value.password);
			// if (!fireUser || !authUser) {
			if (!hasPickedUsername) {
				navigation.navigate("PickUsername");
			} else {
				setHasPickedUsername(true);
			}
		} catch (error: any) {
			setValue({
				...value,
				error: error.message,
			});
		}
	}

	return (
		<View style={[styles.container, colors.offBlackBG]}>
			<TouchableOpacity
				onPress={() => navigation.goBack()}
				style={[
					{
						marginTop: 30,
						borderRadius: 50,
						height: 50,
						width: 50,
					},
				]}
			>
				<Ionicons
					name="arrow-back-outline"
					size={35}
					color={"#00cc4b"}
					style={{
						marginLeft: 20,
					}}
				/>
			</TouchableOpacity>
			<View style={[styles.buttons, flexbox.row, flexbox.alignCenter]}>
				<View style={[styles.controls, flexbox.alignCenter]}>
					{!!value.error && (
						<View style={styles.error}>
							<Text>{value.error}</Text>
						</View>
					)}
					<Input
						placeholder="EMAIL"
						containerStyle={styles.control}
						value={value.email}
						onChangeText={(text) =>
							setValue({ ...value, email: text })
						}
						leftIcon={
							<Icon
								name="envelope"
								size={16}
								color="#00cc4b"
								style={styles.icon}
							/>
						}
						autoComplete="email"
						autoCapitalize="none"
						autoCorrect={false}
						inputStyle={[colors.offWhite, font.fontBold]}
					/>

					<Input
						placeholder="PASSWORD"
						containerStyle={styles.control}
						value={value.password}
						onChangeText={(text) =>
							setValue({ ...value, password: text })
						}
						secureTextEntry={true}
						inputStyle={[colors.offWhite, font.fontBold]}
						leftIcon={
							<Icon
								name="key"
								size={16}
								color="#00cc4b"
								style={styles.icon}
							/>
						}
						autoComplete="password"
						autoCapitalize="none"
						autoCorrect={false}
					/>

					<Button
						title="SIGN IN"
						titleStyle={font.fontBold}
						buttonStyle={[styles.button, colors.darkGreenBG]}
						onPress={signIn}
					/>
					<View style={[flexbox.alignCenter, { marginTop: 10 }]}>
						<Text
							onPress={() =>
								navigation.navigate("Forgot Password")
							}
							style={[
								colors.white,
								font.fontBold,
								font.fontItalic,
							]}
						>
							FORGOT PASSWORD?
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 20,
		justifyContent: "center",
	},

	controls: {
		flex: 1,
		width: "80%",
	},

	control: {
		marginTop: 10,
		width: "80%",
	},

	button: {
		marginTop: 8,
		borderRadius: 10,
		paddingHorizontal: 40,
		height: 40,
	},

	error: {
		marginTop: 10,
		padding: 10,
		color: "#fff",
		backgroundColor: "#D54826FF",
	},
	height100: {
		height: 100,
	},
	buttons: {
		flex: 1,
		top: -25,
	},

	icon: {
		paddingRight: 5,
	},
});

export default SignInScreen;
