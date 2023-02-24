import PickUsername from "@components/PickUsername";
import flexbox from "@styles/flexbox";
import font from "@styles/font";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { RouterProps } from "src/types";

const PickUsernameScreen = ({ navigation }: RouterProps) => {
	return (
		<View
			style={[
				{ height: "100%" },
				flexbox.column,
				flexbox.justifyCenter,
				flexbox.alignCenter,
			]}
		>
			<Text style={[font.sizeXL, font.fontBold, font.textCenter]}>
				Choose your username!
			</Text>
			<Text style={[font.sizeL, font.textCenter, { marginTop: 4 }]}>
				(Don't worry, you can always change it later!)
			</Text>
			<View style={[{ marginTop: 20 }]}>
				<PickUsername></PickUsername>
			</View>
		</View>
	);
};

export default PickUsernameScreen;
