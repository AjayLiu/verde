import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { Challenge, RouterProps } from "src/types";
import { useUser } from "@utils/hooks/useUser";
import { useChallenge } from "@utils/hooks/useChallenge";

export default function HomeScreen({ navigation }: RouterProps) {
	const { authUser } = useUser();
	const { getTodaysChallenges } = useChallenge();
	const [challenges, setChallenges] = useState<Challenge[]>([]);

	useEffect(() => {
		const getChallenges = async () => {
			const result = await getTodaysChallenges();
			setChallenges(result);
		};

		getChallenges();
	}, []);

	return (
		<View style={styles.container}>
			<Text>!!THIS IS A STUB!!</Text>
			<Text>Challenges for {authUser?.email}!</Text>

			{challenges.map((challenge, idx) => {
				return (
					<View key={idx}>
						<Text>{challenge.title}</Text>
					</View>
				);
			})}

			<Button
				title="Home"
				style={styles.button}
				onPress={() => navigation.navigate("Home")}
			/>
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
