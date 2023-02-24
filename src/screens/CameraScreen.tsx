import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Alert,
	ImageBackground,
} from "react-native";
import {
	Camera,
	CameraCapturedPicture,
	CameraType,
	FlashMode,
} from "expo-camera";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import { usePost } from "@hooks/usePost";
import { Challenge, RouterProps } from "src/types";
import * as Progress from "react-native-progress";
import ConfettiCannon from "react-native-confetti-cannon";
import colors from "@styles/colors";
import font from "@styles/font";
import { Icon } from "react-native-elements";

let camera: Camera | null;

export default function CameraScreen({ route, navigation }: RouterProps) {
	const challenge = route.params.challenge as Challenge;

	const [startCamera, setStartCamera] = React.useState(false);
	const [previewVisible, setPreviewVisible] = React.useState(false);
	const [capturedImage, setCapturedImage] = React.useState<
		CameraCapturedPicture | null | undefined
	>(null);
	const [cameraType, setCameraType] = React.useState<CameraType>(
		CameraType.back,
	);
	const [flashMode, setFlashMode] = React.useState(FlashMode.off);

	const __startCamera = async () => {
		const { status } = await Camera.requestCameraPermissionsAsync();
		if (status === "granted") {
			setStartCamera(true);
		} else {
			Alert.alert("Access denied");
		}
	};

	const __takePicture = async () => {
		let photo = await camera?.takePictureAsync();
		if (cameraType === CameraType.front) {
			photo = await manipulateAsync(
				photo?.uri || "",
				[{ rotate: 180 }, { flip: FlipType.Vertical }],
				{ compress: 0, format: SaveFormat.JPEG },
			);
		} else {
			photo = await manipulateAsync(photo?.uri || "", [], {
				compress: 0,
				format: SaveFormat.JPEG,
			});
		}

		setPreviewVisible(true);
		//setStartCamera(false)
		setCapturedImage(photo);
	};

	const { makePost } = usePost();

	const [progress, setProgress] = React.useState(0);
	const [isUploading, setIsUploading] = React.useState(false);
	const [showConfetti, setShowConfetti] = React.useState(false);

	const __savePhoto = async () => {
		if (!capturedImage?.uri) return;
		setIsUploading(true);
		const successCallback = () => {
			// navigation.navigate("SuccessPost", { challenge });
			setIsUploading(false);

			setShowConfetti(true);

			// Redirect back to home after 2 seconds
			setTimeout(() => {
				navigation.reset({
					index: 0,
					routes: [{ name: "HomeSwiper" }],
				});
			}, 2000);
		};
		const progressCallback = (progress: number) => {
			setProgress(progress / 100);
		};
		await makePost(
			capturedImage.uri,
			challenge.uid,
			successCallback,
			progressCallback,
		);
	};
	const __retakePicture = () => {
		setCapturedImage(null);
		setPreviewVisible(false);
		__startCamera();
	};
	const __handleFlashMode = () => {
		if (flashMode === FlashMode.on) {
			setFlashMode(FlashMode.off);
		} else if (flashMode === FlashMode.off) {
			setFlashMode(FlashMode.on);
		} else {
			setFlashMode(FlashMode.auto);
		}
	};
	const __switchCamera = () => {
		if (cameraType === CameraType.back) {
			setCameraType(CameraType.front);
		} else {
			setCameraType(CameraType.back);
		}
	};

	return (
		<View style={styles.container}>
			{startCamera ? (
				<View
					style={{
						flex: 1,
						width: "100%",
					}}
				>
					{previewVisible && capturedImage ? (
						<CameraPreview
							photo={capturedImage}
							savePhoto={__savePhoto}
							retakePicture={__retakePicture}
							progress={progress}
							isUploading={isUploading}
							showConfetti={showConfetti}
						/>
					) : (
						<Camera
							type={cameraType}
							flashMode={flashMode}
							style={{ flex: 1 }}
							ref={(r) => {
								camera = r;
							}}
						>
							<View
								style={{
									flex: 1,
									width: "100%",
									backgroundColor: "transparent",
									flexDirection: "row",
								}}
							>
								<View
									style={{
										position: "absolute",
										bottom: 0,
										flexDirection: "row",
										flex: 1,
										width: "100%",
										padding: 20,
										justifyContent: "space-evenly",
									}}
								>
									<TouchableOpacity
										onPress={__switchCamera}
										// @ts-ignore
										style={{
											marginTop: 20,
											borderRadius: "50%",
											height: 50,
											width: 50,
										}}
									>
										<Text
											style={{
												fontSize: 40,
												height: 50,
												width: 50,
											}}
										>
											🔄
										</Text>
									</TouchableOpacity>
									<View
										style={{
											alignSelf: "center",
											alignItems: "center",
										}}
									>
										<TouchableOpacity
											onPress={__takePicture}
											style={{
												width: 70,
												height: 70,
												bottom: 0,
												borderRadius: 50,
												backgroundColor: "#fff",
											}}
										/>
									</View>
									<TouchableOpacity
										onPress={__handleFlashMode}
										// @ts-ignore
										style={{
											marginTop: 20,
											borderRadius: "50%",
											height: 50,
											width: 50,
											backgroundColor:
												flashMode === "off"
													? "#000"
													: "#fff",
										}}
									>
										<Text
											style={{
												fontSize: 40,
												height: 50,
												width: 50,
											}}
										>
											⚡
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						</Camera>
					)}
				</View>
			) : (
				<View
					style={[
						{
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
							width: "100%",
						},
						colors.offBlackBG,
					]}
				>
					<Text style={[font.sizeTitle, colors.white]}>
						Your challenge:
					</Text>
					<Text style={[font.sizeXL, colors.white, { margin: 10 }]}>
						{"\n" + challenge.description}
					</Text>
					<TouchableOpacity
						onPress={__startCamera}
						style={[
							{
								width: 130,
								borderRadius: 4,
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
								padding: 10,
							},
							{ marginTop: 100 },
							colors.darkGreenBG,
						]}
					>
						<Icon
							type="font-awesome"
							name="camera"
							color="white"
						></Icon>
						<Text style={[colors.white, { marginLeft: 10 }]}>
							Ready?
						</Text>
					</TouchableOpacity>
				</View>
			)}

			<StatusBar style="auto" />
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
});

const CameraPreview = ({
	photo,
	retakePicture,
	savePhoto,
	progress,
	isUploading,
	showConfetti,
}: any) => {
	return (
		<View
			style={{
				backgroundColor: "transparent",
				flex: 1,
				width: "100%",
				height: "100%",
			}}
		>
			<ImageBackground
				source={{ uri: photo && photo.uri }}
				style={{
					flex: 1,
				}}
			>
				<View
					style={{
						flex: 1,
						flexDirection: "column",
						padding: 15,
						justifyContent: "flex-end",
					}}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
						}}
					>
						<TouchableOpacity
							onPress={retakePicture}
							style={{
								width: 130,
								height: 40,

								alignItems: "center",
								borderRadius: 4,
							}}
						>
							<Text
								style={{
									color: "#fff",
									fontSize: 20,
								}}
							>
								Re-take photo
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={savePhoto}
							style={{
								width: 130,
								height: 40,

								alignItems: "center",
								borderRadius: 4,
							}}
						>
							<Text
								style={{
									color: "#fff",
									fontSize: 20,
								}}
							>
								Confirm photo
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>
			{isUploading && (
				<View
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Progress.Circle
						size={100}
						showsText
						unfilledColor={"white"}
						progress={progress}
					/>
					<Text
						style={[
							colors.offWhite,
							colors.offBlackBG,
							{ padding: 10 },
							{ marginTop: 10 },
						]}
					>
						Uploading...
					</Text>
				</View>
			)}
			{showConfetti && (
				<View
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />
					<Text
						style={[
							colors.offWhite,
							colors.offBlackBG,
							{ padding: 10 },
							{ marginTop: 10 },
						]}
					>
						Your post is now live!
					</Text>
				</View>
			)}
		</View>
	);
};
