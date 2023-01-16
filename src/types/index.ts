import { NavigationProp } from "@react-navigation/native";

export interface RouterProps {
	navigation: NavigationProp<any>;
}

export interface FirestoreUser {
	uid: string;
	displayName: string;
	photoUrl: string;
	email: string;
	friendsUids: string[];
	postsUids: string[];
}

export interface Post {
	uid: string;
	imgUrl: string;
	authorUid: string;
	timeUTC: number;
}
