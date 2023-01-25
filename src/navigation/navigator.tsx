// @ts-ignore
import SwipeNavigator from 'react-native-swipe-navigation'

const Nagivator = SwipeNavigator({
    Home: {
        screen: 'Home',
        left: 'Challenges',
        right: 'Profile',
    },

    Challenges: {
        screen: 'Challenges',
        right: 'Home',
    },

    Profile: {
        screen: 'Profile',
        left: 'Home',
    },
});

export default Navigator