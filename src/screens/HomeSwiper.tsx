import React from "react";
import Swiper from "react-native-screens-swiper";
import { RouterProps } from "../types";
import Feed from "@screens/Feed";
import CameraScreen from "@screens/CameraScreen";
import Profile from "@screens/Profile";
import Friends from "@screens/Friends";
import Calendar from "@screens/Calendar";
import Challenges from "@screens/Challenges";
import Settings from "@screens/Settings";

export default function HomeSwipe({ navigation } : RouterProps) {
    const data = [
        {
            tabLabel: 'Challenges',
            component: Challenges,
            props: { navigation }
        },
        {
            tabLabel: 'Feed',
            component: Feed,
            props: { navigation }
        },
        {
            tabLabel: 'Profile',
            component: Profile,
            props: { navigation }
        },
    ];

    return (
        <Swiper
            data={data}
            isStaticPills={true}
            style={styles_2}
            initialScrollIndex={1}
        />
    )
}

const styles_2 = {
    pillButton: {
        backgroundColor: 'white',
    },
    pillActive: {
        backgroundColor: 'yellow',
    },
    pillLabel: {
        color: 'gray',
    },
    activeLabel: {
        color: 'white',
    },
};
