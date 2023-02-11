import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Card } from "react-native-elements";
import { Challenge, RouterProps } from "src/types";
import { useUser } from "@utils/hooks/useUser";
import { useChallenge } from "@utils/hooks/useChallenge";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function HomeScreen({ navigation }: RouterProps) {
	const { authUser, fireUser } = useUser();
	const { getActiveChallenges } = useChallenge();
	const [challenges, setChallenges] = useState<Challenge[]>([]);

	useEffect(() => {
		const getChallenges = async () => {
			const result = await getActiveChallenges();
			setChallenges(result);
		};

		getChallenges();

		// console.log(fireUser?.completedChallengesUids);
	}, []);

	const challengeSelected = (challenge: Challenge) => {
		navigation.navigate("Camera", { challenge });
	};

	return (
		<View style={styles.container}>
			<Ionicons
				name="chevron-forward"
				iconStyle={styles}
				size={32}
				color={"#00CC4B"}
			/>
			<Text>!!THIS IS A STUB!!</Text>
			<Text>Challenges for {authUser?.email}!</Text>

			{challenges.map((challenge, idx) => {
				// if the user has already completed this challenge
				if (fireUser?.completedChallengesUids.includes(challenge.uid))
					return (
						<View key={idx}>
							<Text>COMPLETED:</Text>
							<Text>{challenge.title}</Text>
							<Text>{challenge.description}</Text>
							<Text>Points: {challenge.points}</Text>
							<Text>
								Expires on:{" "}
								{challenge.expirationTime
									.toDate()
									.toLocaleString()}
							</Text>
						</View>
					);

				return (
					<TouchableOpacity
						key={idx}
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						style={{ borderColor: "red", borderWidth: "1" }} // STUB - SOMEONE PLEASE STYLE THIS
						onPress={() => challengeSelected(challenge)}
					>
						<Text>{challenge.title}</Text>
						<Text>{challenge.description}</Text>
						<Text>Points: {challenge.points}</Text>
						<Text>
							Expires on:{" "}
							{challenge.expirationTime.toDate().toLocaleString()}
						</Text>
					</TouchableOpacity>
				);
			})}
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
});
