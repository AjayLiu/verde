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
	const [username, setUsername] = useState(authUser?.displayName || "");
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
		<View style={[textStyles.padding]}>
			<View style={[textStyles.container, colors.darkGreenBG]}>
				<TextInput
					style={[
						font.textCenter,
						font.sizeXL,
						colors.offWhite,
						textStyles.textPadding,
						font.fontBold,
					]}
					onChangeText={setUsername}
					value={username}
					maxLength={15}
					placeholder="username"
				></TextInput>
			</View>
			{usernameTaken && (
				<Text style={[colors.lightGreen, font.textCenter]}>
					USERNAME TAKEN!
				</Text>
			)}
			<Button title="Confirm username" onPress={() => submitUsername()} />
		</View>
	);
};

export default PickUsername;

const textStyles = {
	container: {
		borderRadius: 25,
		borderWidth: 3,
	},
	padding: {
		paddingVertical: 5,
	},
	textPadding: {
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
};
