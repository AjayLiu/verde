import PickUsername from "@components/PickUsername";
import flexbox from "@styles/flexbox";
import font from "@styles/font";
import colors from "@styles/colors";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-elements";
import { RouterProps } from "src/types";
import Ionicons from "@expo/vector-icons/Ionicons";

const PickUsernameScreen = ({ navigation }: RouterProps) => {
	return (
		<View
			style={[
				{ height: "100%" },
				flexbox.column,
				flexbox.justifyCenter,
				flexbox.alignCenter,
				colors.offBlackBG,
			]}
		>
			<TouchableOpacity
				onPress={() => navigation.goBack()}
				style={[
					{
						marginTop: 30,
						borderRadius: 50,
						height: 50,
						width: 50,
						alignSelf: "flex-start",
						position: "absolute",
						top: 20,
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
			<Text
				style={[
					font.sizeXL,
					font.fontBold,
					font.textCenter,
					colors.offWhite,
				]}
			>
				Choose your username!
			</Text>
			<Text
				style={[
					font.sizeL,
					font.textCenter,
					colors.offWhite,
					{ marginTop: 4 },
				]}
			>
				(Don't worry, you can always change it later!)
			</Text>
			<View style={[{ marginTop: 20 }]}>
				<PickUsername></PickUsername>
			</View>
		</View>
	);
};

export default PickUsernameScreen;
