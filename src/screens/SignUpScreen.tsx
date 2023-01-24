import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import { StackScreenProps } from "@react-navigation/stack";
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { useUser } from "@utils/hooks/useUser";

const auth = getAuth();

const SignUpScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
	const [value, setValue] = React.useState({
		email: "",
		password: "",
		error: "",
	});

	const { writeToUserFirestore } = useUser();

	async function signUp() {
		if (value.email === "" || value.password === "") {
			setValue({
				...value,
				error: "Email and password are mandatory.",
			});
			return;
		}

		try {
			await createUserWithEmailAndPassword(
				auth,
				value.email,
				value.password,
			);
			if (auth.currentUser === null) throw new Error("User is null");

			// Some default user values
			const defaultProfilePic =
				"https://img.freepik.com/free-icon/user_318-864557.jpg?w=2000";

			updateProfile(auth.currentUser, {
				// displayName: "New User",
				photoURL: defaultProfilePic,
			});

			await writeToUserFirestore({
				uid: auth.currentUser?.uid || "ERROR",
				email: value.email,
				displayName: "",
				photoUrl: defaultProfilePic,
				friendsUids: [],
				postsUids: [],
			});
			console.log("User created successfully.");

			navigation.navigate("PickUsername");
		} catch (error: any) {
			setValue({
				...value,
				error: error.message,
			});
		}
	}

	return (
		<View style={styles.container}>
			<Text>Signup screen!</Text>

			{!!value.error && (
				<View style={styles.error}>
					<Text>{value.error}</Text>
				</View>
			)}

			<View style={styles.controls}>
				<Input
					placeholder="Email"
					containerStyle={styles.control}
					value={value.email}
					onChangeText={(text) => setValue({ ...value, email: text })}
					leftIcon={<Icon name="envelope" size={16} />}
					autoCompleteType="email"
				/>

				<Input
					placeholder="Password"
					containerStyle={styles.control}
					value={value.password}
					onChangeText={(text) =>
						setValue({ ...value, password: text })
					}
					secureTextEntry={true}
					leftIcon={<Icon name="key" size={16} />}
					autoCompleteType="password"
				/>

				<Button
					title="Sign up"
					buttonStyle={styles.control}
					onPress={signUp}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 20,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},

	controls: {
		flex: 1,
		width: "80%",
	},

	control: {
		marginTop: 10,
	},

	error: {
		marginTop: 10,
		padding: 10,
		color: "#fff",
		backgroundColor: "#D54826FF",
	},
});

export default SignUpScreen;
