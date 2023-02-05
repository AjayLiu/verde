import { Challenge } from "src/types";
import {
	getDoc,
	doc,
	arrayUnion,
	getDocs,
	collection,
	query,
	where,
	Timestamp,
	increment,
} from "firebase/firestore";
import { db } from "@config/firebase";
import { useUser } from "./useUser";

export function useChallenge() {
	const { updateUserFirestore, authUser } = useUser();
	const getChallenge = async (uid: string) => {
		const docSnap = await getDoc(doc(db, "challenges", uid));
		if (docSnap.exists()) {
			// console.log("Challenge data:", docSnap.data());
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
		return docSnap.data() as Challenge;
	};

	const getTodaysChallenges = async () => {
		const querySnapshot = await getDocs(
			query(
				collection(db, "challenges"),
				where("timestamp", "<=", Timestamp.now()),
				where(
					"timestamp",
					">=",
					new Timestamp(Timestamp.now().seconds - 24 * 60 * 60, 0),
				),
			),
		);
		return querySnapshot.docs.map((doc) => doc.data()) as Challenge[];
	};

	const completeChallenge = async (challengeUid: string) => {
		const challenge = await getChallenge(challengeUid);
		updateUserFirestore(authUser?.uid || "", {
			completedChallengesUids: arrayUnion(challenge.uid),
			score: increment(challenge.points),
		});
	};

	return { getChallenge, getTodaysChallenges, completeChallenge };
}
