import { StyleSheet } from "react-native";

export default StyleSheet.create({
	sizeS: {
		fontSize: 11,
	},
	sizeL: {
		fontSize: 15,
	},
	sizeXL: {
		fontSize: 20,
	},
	sizeXML: {
		fontSize: 25,
	},
	sizeXXL: {
		fontSize: 30,
	},
	fontBold: {
		fontWeight: "bold",
	},
	fontItalic: {
		fontStyle: "italic",
	},
	// ONLY USE ON <Text> COMPONENTS TO CENTER TEXT
	textCenter: {
		textAlign: "center",
	},
	textLeft: {
		textAlign: "left",
		paddingLeft: 10,
	},
	textRight: {
		textAlign: "right",
		paddingRight: 10,
	},
});
