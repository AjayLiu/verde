import React, { createElement, useEffect, useState } from "react";

import { db } from "@config/firebase";
import {
	getStorage,
	ref,
	deleteObject,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";

const storage = getStorage();

export function useUpload() {
	const uploadImageToStorage = async (
		localPhotoURI: string,
		imageFilePath: string,
		uploadSuccessCallback: (downloadURL: string) => void,
	) => {
		// Upload the photo to storage
		const response = await fetch(localPhotoURI);

		const blobFile = await response.blob();

		const reference = ref(storage, imageFilePath);
		const uploadTask = uploadBytesResumable(reference, blobFile);

		// Listen for state changes, errors, and completion of the upload.
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log("Upload is " + progress + "% done");
				switch (snapshot.state) {
					case "paused":
						console.log("Upload is paused");
						break;
					case "running":
						console.log("Upload is running");
						break;
					case "canceled":
					case "error":
						console.error("Upload failed");
				}
			},
			(error) => {
				console.error(error);

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
			async () => {
				// Upload completed successfully, now we can get the download URL
				const downloadURL = await getDownloadURL(
					uploadTask.snapshot.ref,
				);

				uploadSuccessCallback(downloadURL);
			},
		);
	};

	return { uploadImageToStorage };
}
