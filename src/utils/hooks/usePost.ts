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

export function usePost() {
	const { updateUserFirestore } = useUser();
	const makePost = async (post: Post) => {
		try {
			// First add post to posts collection
			const postDocRef = await setDoc(doc(db, "posts", post.uid), post);
			console.log("Post made: ", postDocRef);

			// Then add post to user's data
			updateUserFirestore(post.authorUid, {
				posts: arrayUnion(post.uid),
			});
		} catch (e) {
			console.error("Error making post: ", e);
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
