import React, {useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { Button } from "react-native-elements";

type AccordionProps = {
    label: string;
    expanded: string;
}

const Accordion = (props: AccordionProps) => {
    const [isExpand, setIsExpand] = useState(true);
    return (
        <View style={styles.container}>
            <Button
                buttonStyle = {styles.title}
                onPress={() => {
                    setIsExpand(!isExpand);
                }}
                title={isExpand ? props.label : props.label + "\n\n" + props.expanded}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

      },
      title: {
        marginTop: 16,
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: '#E2E4F6',
        borderRadius: 3,
        backgroundColor: '#138A36',
        color: '#E2E4F6',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
      },
});

export default Accordion;