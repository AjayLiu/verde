import { Challenge } from "src/types";
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

export function useChallenge() {
	const { updateUserFirestore, authUser } = useUser();
	const getChallenge = async (uid: string) => {
		const docSnap = await getDoc(doc(db, "challenges", uid));
		if (docSnap.exists()) {
			console.log("Challenge data:", docSnap.data());
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
		return docSnap.data() as Challenge;
	};

	const getTodaysChallenges = async () => {
		const querySnapshot = await getDocs(
			query(collection(db, "challenges"), orderBy("timestamp", "desc")),
		);
		return querySnapshot.docs.map((doc) => doc.data()) as Challenge[];
	};

	return { getChallenge, getTodaysChallenges };
}
