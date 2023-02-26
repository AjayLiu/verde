import React, { Component, useEffect, useState } from "react";
import {
	Dimensions,
	NativeScrollEvent,
	RefreshControl,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { Button, Card } from "react-native-elements";
import { Challenge, RouterProps } from "src/types";
import { useUser } from "@utils/hooks/useUser";
import { useChallenge } from "@utils/hooks/useChallenge";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Accordion from "@components/Accordion";
import colors from "@styles/colors";
import flex from "@styles/flexbox";
import font from "@styles/font";
import { useCallback } from "react";

export default function HomeScreen({ navigation }: RouterProps) {
	const { authUser, fireUser } = useUser();
	const { getActiveChallenges } = useChallenge();
	const [challenges, setChallenges] = useState<Challenge[]>([]);

	const [refreshing, setRefreshing] = React.useState(false);

	const isCloseToBottom = ({
		layoutMeasurement,
		contentOffset,
		contentSize,
	}: NativeScrollEvent) => {
		const paddingToBottom = 20;
		return (
			layoutMeasurement.height + contentOffset.y >=
			contentSize.height - paddingToBottom
		);
	};

	const getChallenges = async () => {
		const result = await getActiveChallenges();
		setChallenges(result);
	};
	useEffect(() => {
		getChallenges();

		// console.log(fireUser?.completedChallengesUids);
	}, []);

	const onRefresh = useCallback(async () => {
		await getChallenges();
		setRefreshing(false);
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<View
				style={[
					flex.alignCenter,
					flex.justifyCenter,
					colors.offBlackBG,
					{ marginTop: 3 },
					styles.marB,
				]}
			>
				<Text
					style={[
						font.textCenter,
						font.sizeXL,
						colors.offWhite,
						font.fontBold,
						// styles.button,
					]}
				>
					CHALLENGES
					{/* Challenges for {fireUser?.displayName}!    */}
				</Text>
			</View>
			<ScrollView
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					></RefreshControl>
				}
				// onScroll={({ nativeEvent }) => {
				// 	if (isCloseToBottom(nativeEvent)) {

				// 	}
				// }}
				// style={{ flex: 1, height: "90%" }}
				// automaticallyAdjustsScrollIndicatorInsets={true}
				scrollEventThrottle={400}
				style={{ flexGrow: 1 }}
			>
				<View
					style={[
						// styles.height100,
						colors.offBlackBG,
						flex.column,
						flex.alignCenter,
						flex.justifyStart,
						{ paddingBottom: 20 },
						// styles.inner,
					]}
				>
					{challenges.map((challenge, idx) => {
						// if the user has already completed this challenge
						if (
							fireUser?.completedChallengesUids.includes(
								challenge.uid,
							)
						) {
							return (
								<Accordion
									key={idx}
									navigation={navigation}
									challenge={challenge}
									isCompleted
								></Accordion>
							);
						}

						return (
							<Accordion
								key={idx}
								navigation={navigation}
								challenge={challenge}
								isCompleted={false}
							></Accordion>
						);
					})}
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	button: {
		marginTop: 10,
	},
	// height100: {
	// 	height: "100%",
	// },
	logo: {
		top: 0,
		position: "absolute",
	},
	marB: {
		marginBottom: 17,
	},
	// inner: {
	// 	flex: 1,
	// },
});
