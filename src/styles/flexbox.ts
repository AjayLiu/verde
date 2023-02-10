import { StyleSheet } from "react-native";

// NOTE: always use these for styling flexboxes
// anything more can be put in local styles
export default StyleSheet.create({
	// flex direction (controls main axis)
	column: {
		flexDirection: "column",
	},
	row: {
		flexDirection: "row",
	},
	// main axis
	justifyStart: {
		justifyContent: "flex-start",
	},
	justifyEnd: {
		justifyContent: "flex-end",
	},
	justifyCenter: {
		justifyContent: "center",
	},
	justifyBetween: {
		justifyContent: "space-between",
	},
	justifyAround: {
		justifyContent: "space-around",
	},
	justifyEvenly: {
		justifyContent: "space-evenly",
	},
	// cross axis
	alignStretch: {
		alignItems: "stretch",
	},
	alignStart: {
		alignItems: "flex-start",
	},
	alignEnd: {
		alignItems: "flex-end",
	},
	alignCenter: {
		alignItems: "center",
	},
	alignBaseline: {
		alignItems: "baseline",
	},
	// wrapping
	flexWrap: {
		flexWrap: "wrap",
	},
	flexNoWrap: {
		flexWrap: "nowrap",
	},
	flexWrapReverse: {
		flexWrap: "wrap-reverse",
	},
	// flex-grow properties
	growOne: {
		flexGrow: 1,
	},
	growTwo: {
		flexGrow: 2,
	},
	growThree: {
		flexGrow: 3,
	},
	growFour: {
		flexGrow: 4,
	},
	growFive: {
		flexGrow: 5,
	},
	growSix: {
		flexGrow: 6,
	},
	growSeven: {
		flexGrow: 7,
	},
	growEight: {
		flexGrow: 8,
	},
	growNine: {
		flexGrow: 9,
	},
	growTen: {
		flexGrow: 10,
	},
	// flex-basis properties in %s
	basis10: {
		flexBasis: "10%",
	},
	basis15: {
		flexBasis: "15%",
	},
	basis20: {
		flexBasis: "20%",
	},
	basis30: {
		flexBasis: "30%",
	},
	basis40: {
		flexBasis: "40%",
	},
	basis50: {
		flexBasis: "50%",
	},
	basis60: {
		flexBasis: "60%",
	},
	basis70: {
		flexBasis: "70%",
	},
	basis80: {
		flexBasis: "80%",
	},
	basis85: {
		flexBasis: "85%",
	},
	basis90: {
		flexBasis: "90%",
	},
	basis100: {
		flexBasis: "100%",
	},
});
