import { NavigationProp } from "@react-navigation/native";
import { Timestamp } from "firebase/firestore";

export interface RouterProps {
	route?: any;
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
	score: number;
}

export interface Post {
	uid: string;
	imgUrl: string;
	caption: string;
	authorUid: string;
	timestamp: Timestamp;
	comments: Comment[];
	likes: Like[];
	challengeUid: string;
}

export interface Comment {
	uid: string;
	authorUid: string;
	postUid: string;
	timestamp: Timestamp;
	text: string;
}

export interface Like {
	uid: string;
	authorUid: string;
	postUid: string;
	timestamp: Timestamp;
}

export interface Challenge {
	uid: string;
	title: string;
	description: string;
	points: number;
	startTime: Timestamp;
	expirationTime: Timestamp;
}
