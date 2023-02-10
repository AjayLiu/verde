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
	Timestamp,
} from "firebase/firestore";
import { db } from "@config/firebase";
import { useUser } from "./useUser";
import { uuidv4 } from "@firebase/util";
import { useUpload } from "./useUpload";
import { useChallenge } from "./useChallenge";

export function usePost() {
	const { updateUserFirestore, authUser } = useUser();
	const { uploadImageToStorage } = useUpload();
	const { completeChallenge } = useChallenge();
	const makePost = async (
		photoUri: string,
		challengeUid: string,
		successCallback: () => void,
	) => {
		const postUid = uuidv4();
		const onlineImageFileName = "posts/" + postUid;

		const callback = async (downloadURL: string) => {
			// Upload completed successfully, now we can get the download URL
			const newPost = {
				authorUid: authUser?.uid || "",
				imgUrl: downloadURL,
				timestamp: Timestamp.now(),
				uid: postUid as string,
				comments: [],
				likes: [],
				caption: "",
				challengeUid: challengeUid,
			} as Post;
			// First add post to posts collection
			const postDocRef = await setDoc(
				doc(db, "posts", newPost.uid),
				newPost,
			);
			console.log("Post made: ", postDocRef);

			// Add to user's completed challenges list
			await completeChallenge(challengeUid);

			// Then add post to user's data
			await updateUserFirestore(newPost.authorUid, {
				postsUids: arrayUnion(newPost.uid),
			});

			successCallback();
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
			query(collection(db, "posts"), orderBy("timestamp", "desc")),
		);
		return querySnapshot.docs.map((doc) => doc.data()) as Post[];
	};

	return { makePost, getPost, getAllPosts };
}
