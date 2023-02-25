import colors from "@styles/colors";
import flexbox from "@styles/flexbox";
import font from "@styles/font";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-elements";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Challenge, RouterProps } from "src/types";

type AccordionProps = {
	navigation: RouterProps["navigation"];
	challenge: Challenge;
	isCompleted: boolean;
};

const Accordion = (props: AccordionProps) => {
	const [isExpand, setIsExpand] = useState(false);

	const getTimeRemainingStr = (endTime: Date) => {
		const currentTime = new Date().getTime();
		const timeDiff = endTime.getTime() - currentTime;
		const seconds = Math.floor(timeDiff / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
		const weeks = Math.floor(days / 7);
		const months = Math.floor(weeks / 4);
		const years = Math.floor(months / 12);

		if (seconds < 60) {
			return `${seconds} seconds left`;
		} else if (minutes == 1) {
			return `${minutes} minute left`;
		} else if (minutes < 60) {
			return `${minutes} minutes left`;
		} else if (hours == 1) {
			return `${hours} hour left`;
		} else if (hours < 24) {
			return `${hours} hours left`;
		} else if (days == 1) {
			return `${days} day left`;
		} else if (days < 7) {
			return `${days} days left`;
		} else if (weeks == 1) {
			return `${weeks} week left`;
		} else if (weeks < 4) {
			return `${weeks} weeks left`;
		} else if (months == 1) {
			return `${months} month left`;
		} else if (months < 12) {
			return `${months} months left`;
		} else if (years == 1) {
			return `${years} year left`;
		} else {
			return `${years} years left`;
		}
	};

	const challengeSelected = (challenge: Challenge) => {
		props.navigation.navigate("Camera", { challenge });
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={[
					{
						marginTop: 16,
						paddingVertical: 10,
						paddingHorizontal: 15,
						// borderWidth: 2,
						// borderColor: "#E2E4F6",
						borderRadius: 10,
					},
					flexbox.row,
					flexbox.alignCenter,
					flexbox.justifyEnd,
					props.isCompleted ? colors.blueBG : colors.darkGreenBG,
				]}
				onPress={() => {
					setIsExpand(!isExpand);
				}}
			>
				<Icon
					type="font-awesome"
					name={isExpand ? "chevron-down" : "chevron-right"}
					color="white"
					style={styles.marR}
					size={20}
				></Icon>
				<Text
					style={[
						styles.title,
						{ width: "80%" },
						props.isCompleted && {
							textDecorationLine: "line-through",
						},
					]}
				>
					{props.challenge.title}
				</Text>
				<Text style={[colors.offWhite, font.fontBold]}>
					+{props.challenge.points}
				</Text>
			</TouchableOpacity>
			{isExpand && (
				<View style={[styles.expanded, flexbox.alignCenter]}>
					{props.isCompleted && (
						<Text
							style={[
								font.textCenter,
								font.sizeL,
								colors.offWhite,
								{ marginHorizontal: 5 },
							]}
						>
							You completed:
						</Text>
					)}
					<Text
						style={[
							font.textCenter,
							font.sizeL,
							colors.offWhite,
							{ marginHorizontal: 30, fontWeight:'400' },
						]}
					>
						{props.challenge.description}
					</Text>
					{!props.isCompleted && (
						<TouchableOpacity
							style={[
								flexbox.row,
								flexbox.alignCenter,
								colors.blueBG,
								{ paddingVertical: 10 },
								{ paddingHorizontal: 16 },
								{ borderRadius: 12 },
								{ marginTop: 15 },
							]}
							onPress={() => challengeSelected(props.challenge)}
						>
							<Icon
								type="font-awesome"
								name="camera"
								color="white"
							></Icon>
							<Text
								style={[
									font.textCenter,
									font.sizeL,
									font.fontBold,
									colors.offWhite,
									{ marginLeft: 8 },
								]}
							>
								DO CHALLENGE
							</Text>
						</TouchableOpacity>
					)}
					<Text
						style={[
							{ marginTop: 10 },
							font.textCenter,
							colors.offWhite,
							font.fontBold,
						]}
					>
						{getTimeRemainingStr(
							props.challenge.expirationTime.toDate(),
						)}
					</Text>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "87.5%",
	},
	title: {
		// backgroundColor: "#138A36",
		color: "#E2E4F6",
		textAlign: "center",
		fontSize: 18,
		fontWeight: "bold",
	},
	expanded: {
		borderWidth: 2.5,
		borderColor: "#138a36",
		borderRadius: 10,
		paddingVertical: 10,
		borderTopWidth: 0.75,
	},
	marR: {
		marginRight: 17.5,
	},
});

export default Accordion;
