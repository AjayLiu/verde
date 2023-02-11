import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { StackScreenProps } from "@react-navigation/stack";
import { Challenge, RouterProps } from "src/types";

const SuccessPostScreen = ({ route, navigation }: RouterProps) => {
	const challenge = route.params.challenge as Challenge;
	return (
		<View style={styles.container}>
			<Text>Post Successful!</Text>
			<Button
				title={"Return home"}
				// onPress={() => navigation.navigate("HomeSwiper")}
				onPress={() =>
					navigation.reset({
						index: 0,
						routes: [{ name: "HomeSwiper" }],
					})
				}
			></Button>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 20,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default SuccessPostScreen;
