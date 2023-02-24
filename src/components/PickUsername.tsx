import { useUser } from "@utils/hooks/useUser";
import { useContext, useEffect, useState } from "react";

import {
	Text,
	View,
	Image,
	StyleSheet,
	Dimensions,
	Button,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import UsernameContext from "../contexts/UsernameContext";
import font from "@styles/font";
import colors from "@styles/colors";

const PickUsername = () => {
	const { authUser, checkIfUsernameValid, updateUsername } = useUser();
	const [usernameTaken, setUsernameTaken] = useState(false);

	// Username
	const [username, setUsername] = useState(
		authUser?.displayName || "New User",
	);
	useEffect(() => {
		if (authUser?.displayName) setUsername(authUser?.displayName);
	}, [authUser?.displayName]);

	useEffect(() => {
		setUsernameTaken(!checkIfUsernameValid(username));
	}, [username]);

	const submitUsername = async () => {
		if (!checkIfUsernameValid(username)) return;

		await updateUsername(username);

		setHasPickedUsername(true);
	};

	const { hasPickedUsername, setHasPickedUsername } =
		useContext(UsernameContext);

	return (
		<View>
			<TextInput style={[font.textCenter, font.sizeTitle, colors.offWhite, textStyles.text]}
					   onChangeText={setUsername} value={username}></TextInput>
			{usernameTaken && (
				<Text style={{ color: "red" }}>Username taken!</Text>
			)}
			<Button title="Confirm username" onPress={() => submitUsername()} />
		</View>
	);
};

export default PickUsername;

const textStyles = {
	text: {
		paddingTop: 10,
	},

	background: {
		borderRadius: 25,
		width: Dimensions.get("window").width / 2,
        height: Dimensions.get("window").width / 2,
	}
}