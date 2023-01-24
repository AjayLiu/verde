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
import { useUpload } from "./useUpload";

const storage = getStorage();

export function usePost() {
	const { updateUserFirestore, authUser } = useUser();
	const { uploadImageToStorage } = useUpload();
	const makePost = async (photoUri: string) => {
		const postUid = uuidv4();
		const onlineImageFileName = "posts/" + postUid;

		const callback = async (downloadURL: string) => {
			// Upload completed successfully, now we can get the download URL
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
		};

		await uploadImageToStorage(photoUri, onlineImageFileName, callback);
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
