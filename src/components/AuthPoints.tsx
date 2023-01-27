import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useUser } from "@utils/hooks/useUser";

const AuthPoints = () => {
	const { authUser } = useUser();

	return (
		//stub
		<View>
			{/* TODO: get actual points from auth and display them here */}
			{/* <Text>{authUser?.points}</Text> */}
			<Text>total auth points</Text>
		</View>
	);
};

const styles = StyleSheet.create({});

export default AuthPoints;
