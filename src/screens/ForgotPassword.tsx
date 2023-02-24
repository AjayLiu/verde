import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const auth = getAuth();
const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [successMsg, setSuccessMsg] = useState("");

	const onReset = async () => {
		console.log(email);
		try {
			await sendPasswordResetEmail(auth, email);
			setSuccessMsg(
				"Password reset email sent! Please check your inbox.",
			);
		} catch (error: any) {
			setError("The email is invalid! Please try again.");
			console.error(error);
		}
	};

	return (
		<View style={styles.container}>
			{!!error && (
				<View style={styles.error}>
					<Text>{error}</Text>
				</View>
			)}
			{!!successMsg && (
				<View style={styles.success}>
					<Text>{successMsg}</Text>
				</View>
			)}
			<Input
				placeholder="Email"
				containerStyle={styles.control}
				value={email}
				onChangeText={(text) => setEmail(text)}
				leftIcon={<Icon name="envelope" size={16} />}
				autoComplete="email"
			/>
			<Button
				title="Send password reset email"
				onPress={() => {
					onReset();
				}}
			></Button>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		margin: 30,
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

	success: {
		marginTop: 10,
		padding: 10,
		backgroundColor: "#4CAF50FF",
	},
});
export default ForgotPassword;
