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
			console.log("No such challenge!");
		}
		return docSnap.data() as Challenge;
	};

	const getActiveChallenges = async () => {
		const querySnapshot = await getDocs(
			query(
				collection(db, "challenges"),
				// where("startTime", "<=", Timestamp.now()),
				where("expirationTime", ">=", Timestamp.now()),
			),
		);
		const unexpiredChallenges = querySnapshot.docs.map((doc) =>
			doc.data(),
		) as Challenge[];
		return unexpiredChallenges.filter((thisChallenge) => {
			return thisChallenge.startTime <= Timestamp.now();
		});
	};

	const completeChallenge = async (challengeUid: string) => {
		const challenge = await getChallenge(challengeUid);
		updateUserFirestore(authUser?.uid || "", {
			completedChallengesUids: arrayUnion(challenge.uid),
			score: increment(challenge.points),
		});
	};

	return {
		getChallenge,
		getActiveChallenges,
		completeChallenge,
	};
}
