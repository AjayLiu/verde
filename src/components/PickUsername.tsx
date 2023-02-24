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
import flexbox from "@styles/flexbox";
import Ionicons from "@expo/vector-icons/Ionicons";

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
		<View style={[textStyles.padding, textStyles.width]}>
			<View style={[flexbox.row]}>
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
				<Ionicons
					name="checkmark-outline"
					size={30}
					style={[
						colors.lightGreen,
						flexbox.justifyEnd,
						textStyles.iconPadding,
					]}
					onPress={() => submitUsername()}
				/>
			</View>
			{usernameTaken && (
				<Text
					style={[
						{ color: "red" },
						textStyles.textPadding,
						textStyles.iconPadding,
					]}
				>
					That username is taken.
				</Text>
			)}
		</View>
	);
};

export default PickUsername;

const textStyles = {
	container: {
		borderRadius: 25,
		width: 140,
	},
	padding: {
		paddingVertical: 5,
	},
	textPadding: {
		paddingHorizontal: 15,
		paddingVertical: 7,
	},
	iconPadding: {
		paddingTop: 3,
		paddingLeft: 10,
	},
	width: {
		width: "100%",
	},
};
