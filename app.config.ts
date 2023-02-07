import "dotenv/config";

export default {
	expo: {
		name: "verde",
		slug: "verde",
		version: "1.0.0",
		orientation: "portrait",
		icon: "./src/assets/icon.png",
		splash: {
			image: "./src/assets/splash.png",
			resizeMode: "contain",
			backgroundColor: "#ffffff",
		},
		updates: {
			fallbackToCacheTimeout: 0,
		},
		assetBundlePatterns: ["**/*"],
		ios: {
			supportsTablet: true,
			bundleIdentifier: "com.verde.verde",
		},
		android: {
			adaptiveIcon: {
				foregroundImage: "./src/assets/adaptive-icon.png",
				backgroundColor: "#FFFFFF",
			},
		},
		web: {
			favicon: "./src/assets/favicon.png",
		},
		extra: {
			firebaseApiKey: process.env.FIREBASE_API_KEY,
			firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
			firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
			firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
			firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
			firebaseAppId: process.env.FIREBASE_APP_ID,
			eas: {
				projectId: "81d943a8-c204-440a-98a9-df836b76e31c",
			},
		},
	},
};
