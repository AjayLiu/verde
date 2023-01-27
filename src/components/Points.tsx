import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { FirestoreUser } from "src/types";

type PointsProps = {
	user?: FirestoreUser;
};

const Points = (props: PointsProps) => {
	return (
		//stub
		<View>
			{/* TODO: get actual points from user and display them here */}
			<Text>total points</Text>
		</View>
	);
};

const styles = StyleSheet.create({});

export default Points;
