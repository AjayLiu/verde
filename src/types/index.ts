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
	challengesCompletedUids: string[];
}

export interface Post {
	uid: string;
	imgUrl: string;
	caption: string;
	authorUid: string;
	timeUTC: number;
	comments: Comment[];
	likes: Like[];
	challengeUid: string;
}

export interface Comment {
	uid: string;
	authorUid: string;
	postUid: string;
	timeUTC: number;
	text: string;
}

export interface Like {
	uid: string;
	authorUid: string;
	postUid: string;
	timeUTC: number;
}

export interface Challenge {
	uid: string;
	title: string;
	description: string;
	points: number;
}
