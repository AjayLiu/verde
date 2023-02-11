import React, {Component, useEffect, useState} from "react";
import {Image, StyleSheet, Text, TextInput, View} from "react-native";
import {Button} from "react-native-elements";
import {RouterProps} from "src/types";
import {useUser} from "@utils/hooks/useUser";
import * as imagePicker from "expo-image-picker";
import {FlipType, manipulateAsync, SaveFormat} from "expo-image-manipulator";
import PickUsername from "@components/PickUsername";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "@styles/colors";
import flex from "@styles/flexbox";
import font from "@styles/font";

export default function HomeScreen({navigation}: RouterProps) {
    const {authUser, deleteUserFromFirestore, updateProfilePicture} =
        useUser();

    // The path of the picked image
    const [pickedImagePath, setPickedImagePath] = useState("");

    const deleteAccount = async () => {
        console.log("Deleting account");

        await deleteUserFromFirestore(authUser?.uid || "");
    };

    // This function is triggered when the "Select an image" button pressed
    const showImagePicker = async () => {
        const result = await imagePicker.launchImageLibraryAsync({});

        // Explore the result
        // console.log(result);

        if (!result.canceled) {
            setPickedImagePath(result.assets[0].uri);
            // console.log(result.assets[0]);
        }
    };

    // This function is triggered when the "Open camera" button pressed
    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult =
            await imagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }

        const result = await imagePicker.launchCameraAsync({
            quality: 0,
        });

        // Explore the result
        console.log(result);

        const photo = await manipulateAsync(
            result.assets?.at(0)?.uri || "",
            [{rotate: 180}, {flip: FlipType.Vertical}],
            {compress: 0, format: SaveFormat.JPEG},
        );

        if (!result.canceled) {
            setPickedImagePath(photo.uri);
        }
    };

    return (
        <View style={[
            styles.height100,
            colors.offBlackBG,
            flex.column,
            flex.alignCenter,
            flex.justifyStart,
        ]}

        >
            <View
                style={[
                icon.space,
                flex.row,
                flex.justifyEvenly,
                ]}
            >
                <Ionicons
                    name="person"
                    iconStyle={styles}
                    size={22.5}
                    color={"#00CC4B"}
                    style={{
                        opacity: 0.25,
                    }}
                    // onPress={() => navigation.reset({
                    // 	index: 0,
                    // 	routes: [{ name: "HomeSwiper" }],
                    // })}
                />

            </View>


            <Text style={[font.textCenter, font.sizeXL, colors.offWhite]} >!!THIS IS A STUB!!</Text>
            <Text style={[font.textCenter, font.sizeXL, colors.offWhite]} >Settings for {authUser?.email}!</Text>

            <Image
                source={{
                    uri:
                        pickedImagePath ||
                        authUser?.photoURL ||
                        "https://media.istockphoto.com/id/1288130003/vector/loading-progress-circle-in-black-and-white.jpg?s=612x612&w=0&k=20&c=eKCLbwdoJy5a7oofoh9AEt6Mp7dc1p79LCMmR-eNM0U=",
                }}
                style={{width: 200, height: 200}}
            ></Image>

            <PickUsername></PickUsername>

            <Button
                title="Profile"
                style={styles.button}
                onPress={() => navigation.navigate("Profile")}
            />

            <Button
                title="Change Profile Picture"
                style={styles.button}
                onPress={showImagePicker}
            />
            <Button
                title="Take profile picture"
                style={styles.button}
                onPress={openCamera}
            />
            <Button
                title="Confirm changes"
                style={styles.button}
                onPress={() => updateProfilePicture(pickedImagePath)}
            />

            <Button
                title="Delete account"
                style={styles.button}
                onPress={deleteAccount}
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
    height100: {
        height: "100%",
    },
});

const icon = StyleSheet.create({
    space: {
        position: "relative",
        left: -165
    },
})
