import PickUsername from "@components/PickUsername";
import { useUser } from "@utils/hooks/useUser";
import { updateProfile } from "firebase/auth";
import { useContext, useEffect } from "react";
import UsernameContext from "../contexts/UsernameContext";
import { RouterProps } from "src/types";

const PickUsernameScreen = ({ navigation }: RouterProps) => {
	const { authUser, writeToUserFirestore } = useUser();

	const { hasPickedUsername, setHasPickedUsername } =
		useContext(UsernameContext);

	useEffect(() => {
		if (!authUser) return;

		const createUser = async () => {
			// Some default user values
			const defaultProfilePic =
				"https://img.freepik.com/free-icon/user_318-864557.jpg?w=2000";

			updateProfile(authUser, {
				// displayName: "New User",
				photoURL: defaultProfilePic,
			});

			await writeToUserFirestore({
				uid: authUser?.uid || "ERROR",
				email: authUser?.email || "ERROR",
				displayName: "",
				photoUrl: defaultProfilePic,
				friendsUids: [],
				postsUids: [],
				challengesCompletedUids: [],
			});
			console.log("User created successfully.");
		};

		if (hasPickedUsername) {
			createUser();
		}
	}, [hasPickedUsername]);
	return <PickUsername></PickUsername>;
};

export default PickUsernameScreen;
