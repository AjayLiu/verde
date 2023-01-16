/* eslint-disable @typescript-eslint/ban-ts-comment */
import { StatusBar } from "expo-status-bar";
import React from "react";
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
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import uuid from "react-native-uuid";

let camera: Camera | null;

const storage = getStorage();

export default function CameraScreen() {
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
	const __savePhoto = async () => {
		async function uploadImageAsync(uri: string) {
			try {
				const response = await fetch(uri);

				const blobFile = await response.blob();

				const onlineImageFileName = "images/" + uuid.v4();

				const reference = ref(storage, onlineImageFileName);
				console.log(reference);
				const uploadTask = uploadBytesResumable(reference, blobFile);

				// Listen for state changes, errors, and completion of the upload.
				uploadTask.on(
					"state_changed",
					(snapshot) => {
						// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
						const progress =
							(snapshot.bytesTransferred / snapshot.totalBytes) *
							100;
						console.log("Upload is " + progress + "% done");
						switch (snapshot.state) {
							case "paused":
								console.log("Upload is paused");
								break;
							case "running":
								console.log("Upload is running");
								break;
						}
					},
					(error) => {
						// A full list of error codes is available at
						// https://firebase.google.com/docs/storage/web/handle-errors
						switch (error.code) {
							case "storage/unauthorized":
								// User doesn't have permission to access the object
								break;
							case "storage/canceled":
								// User canceled the upload
								break;

							// ...

							case "storage/unknown":
								// Unknown error occurred, inspect error.serverResponse
								break;
						}
					},
					() => {
						// Upload completed successfully, now we can get the download URL
						getDownloadURL(uploadTask.snapshot.ref).then(
							(downloadURL) => {
								console.log("File available at", downloadURL);
							},
						);
					},
				);
			} catch (err) {
				return Promise.reject(err);
			}
		}
		if (!capturedImage?.uri) return;
		uploadImageAsync(capturedImage.uri);
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
										left: "5%",
										top: "10%",
										flexDirection: "column",
										justifyContent: "space-between",
									}}
								>
									<TouchableOpacity
										onPress={__handleFlashMode}
										// @ts-ignore
										style={{
											backgroundColor:
												flashMode === "off"
													? "#000"
													: "#fff",
											borderRadius: "50%",
											height: 25,
											width: 25,
										}}
									>
										<Text
											style={{
												fontSize: 20,
											}}
										>
											⚡️
										</Text>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={__switchCamera}
										// @ts-ignore
										style={{
											marginTop: 20,
											borderRadius: "50%",
											height: 25,
											width: 25,
										}}
									>
										<Text
											style={{
												fontSize: 20,
											}}
										>
											{cameraType === "front"
												? "🤳"
												: "📷"}
										</Text>
									</TouchableOpacity>
								</View>
								<View
									style={{
										position: "absolute",
										bottom: 0,
										flexDirection: "row",
										flex: 1,
										width: "100%",
										padding: 20,
										justifyContent: "space-between",
									}}
								>
									<View
										style={{
											alignSelf: "center",
											flex: 1,
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
								</View>
							</View>
						</Camera>
					)}
				</View>
			) : (
				<View
					style={{
						flex: 1,
						backgroundColor: "#fff",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<TouchableOpacity
						onPress={__startCamera}
						style={{
							width: 130,
							borderRadius: 4,
							backgroundColor: "#14274e",
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
							height: 40,
						}}
					>
						<Text
							style={{
								color: "#fff",
								fontWeight: "bold",
								textAlign: "center",
							}}
						>
							Take picture
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

const CameraPreview = ({ photo, retakePicture, savePhoto }: any) => {
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
								Re-take
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
								save photo
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>
		</View>
	);
};
