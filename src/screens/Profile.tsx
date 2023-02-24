import React, {useEffect} from "react";
import {StyleSheet, Text, View} from "react-native";
import {Post, RouterProps} from "src/types";
import {useUser} from "@utils/hooks/useUser";
import ProfilePicture from "@components/ProfilePicture";
import Ionicons from "@expo/vector-icons/Ionicons";
import UserCalendar from "@components/UserCalendar";
import font from "@styles/font";
import flex from "@styles/flexbox";
import colors from "@styles/colors";
import {usePost} from "@utils/hooks/usePost";

export default function Profile({navigation}: RouterProps) {
    const {fireUser} = useUser();
    const {getAllPosts} = usePost();
    const [posts, setPosts] = React.useState<Post[]>([]);

    const fetchAllPosts = async () => {
        const allPosts = await getAllPosts();
        setPosts(allPosts);
    };

    useEffect(() => {
        fetchAllPosts();
    }, []);

    function getNumPosts() {
        let num = 0;
        posts.forEach((post) => {
            if (post.authorUid === fireUser?.uid) {
                num++;
            }
        });
        return num;
    }

    return (
        <View
            style={[
                styles.height100,
                colors.offBlackBG,
                flex.column,
                flex.alignCenter,
                flex.justifyStart,
            ]}
        >
            <View
                style={[
                    icon.space,
                    flex.row,
                    flex.alignEnd,
                ]}
            >
                {/*<Ionicons*/}
                {/*    name="albums"*/}
                {/*    iconStyle={icon}*/}
                {/*    size={22.5}*/}
                {/*    color={"#00CC4B"}*/}
                {/*    style={{opacity: 0.25}}*/}
                {/*/>*/}

                <Ionicons
                    name="settings-outline"
                    iconStyle={styles}
                    size={22.5}
                    color={"#00CC4B"}
                    onPress={() => navigation.navigate("Settings")}
                />

            </View>
            <ProfilePicture size={100} style={[styles.marB, styles.marT]}/>
            <Text
                style={[
                    font.fontBold,
                    font.sizeXL,
                    styles.marT,
                    styles.marB,
                    colors.offWhite,
                ]}
            >
                {fireUser?.displayName}
            </Text>

            <View
                style={[
                    styles.width100,
                    flex.row,
                    flex.justifyEvenly,
                    styles.marT,
                ]}
            >
                <View style={flex.column}>
                    <Text
                        style={[font.textCenter, font.sizeXL, colors.offWhite]}
                    >
                        {fireUser?.score}
                    </Text>
                    <Text style={[font.sizeL, colors.offWhite]}>points</Text>
                </View>
                <View style={flex.column}>
                    <Text
                        style={[font.textCenter, font.sizeXL, colors.offWhite]}
                    >
                        {getNumPosts()}
                    </Text>
                    <Text style={[font.sizeL, colors.offWhite]}>
                        {getNumPosts() == 1 ? "post" : "posts"}
                    </Text>
                </View>
            </View>

            <View style={[styles.width100, styles.marT]}>
                <UserCalendar posts={posts}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    marB: {
        marginBottom: 5,
    },
    marT: {
        marginTop: 5,
    },
    width100: {
        width: "100%",
    },
    height100: {
        height: "100%",
    },
});

const icon = StyleSheet.create({
    space: {
        position: "relative",
        right: -165,
    },
})
