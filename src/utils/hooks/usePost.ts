import { Post } from "src/types";
import {
	getDoc,
	doc,
	setDoc,
	arrayUnion,
	getDocs,
	collection,
	query,
	orderBy,
} from "firebase/firestore";
import { db } from "@config/firebase";
import { useUser } from "./useUser";
import { uuidv4 } from "@firebase/util";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";

const storage = getStorage();

export function usePost() {
	const { updateUserFirestore, authUser } = useUser();
	const makePost = async (photoUri: string) => {
		try {
			const response = await fetch(photoUri);

			const blobFile = await response.blob();

			const postUid = uuidv4();
			const onlineImageFileName = "posts/" + postUid;

			const reference = ref(storage, onlineImageFileName);
			console.log(reference);
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

					const newPost = {
						authorUid: authUser?.uid || "",
						imgUrl: downloadURL,
						timeUTC: Date.now(),
						uid: postUid as string,
						comments: [],
						likes: [],
						caption: "",
					} as Post;
					// First add post to posts collection
					const postDocRef = await setDoc(
						doc(db, "posts", newPost.uid),
						newPost,
					);
					console.log("Post made: ", postDocRef);

					// Then add post to user's data
					updateUserFirestore(newPost.authorUid, {
						postsUids: arrayUnion(newPost.uid),
					});
				},
			);
		} catch (err) {
			return Promise.reject(err);
		}
	};

	const getPost = async (uid: string) => {
		const docSnap = await getDoc(doc(db, "posts", uid));
		if (docSnap.exists()) {
			console.log("Post data:", docSnap.data());
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
		return docSnap.data() as Post;
	};

	const getAllPosts = async () => {
		const querySnapshot = await getDocs(
			query(collection(db, "posts"), orderBy("timeUTC", "desc")),
		);
		return querySnapshot.docs.map((doc) => doc.data()) as Post[];
	};

	return { makePost, getPost, getAllPosts };
}
