import React from "react";
import { View, Text, Image, Platform, StyleSheet } from "react-native";
import {
    Container,
    Content,
    Button,
    Icon,
    H2,
    Tabs,
    Tab,
    Input
} from "native-base";
const ChangeTabs = (props) => {
    return(
        <View>
            <Tabs style={styles.container}>
                <Tab heading="Name" style={styles.nameInput}>
                    <Input
                        placeholder="First and last, middle optional"
                        style={styles.textInput}
                        value={props.name}
                        onChangeText={text => props.inputHandler("name", text)}
                    />
                    <Input
                        placeholder="City, State"
                        style={[styles.textInput, styles.textInputSmall]}
                        value={props.cityState}
                        onChangeText={text => props.inputHandler("cityState", text)}
                    />
                </Tab>
                <Tab heading="Email">
                    <Input
                        placeholder="Email address"
                        style={styles.textInput}
                        value={props.email}
                        onChangeText={text => props.inputHandler("email", text)}
                    />
                </Tab>
                <Tab heading="Address">
                    <Input
                        placeholder="Mailing address"
                        style={styles.textInput}
                        value={props.address}
                        onChangeText={text => props.inputHandler("address", text)}
                    />
                </Tab>
                <Tab heading="Phone">
                    <Input
                        placeholder="Phone any format, no letters"
                        style={styles.textInput}
                        value={props.phone}
                        onChangeText={text => props.inputHandler("phone", text)}
                    />
                </Tab>
                <Tab heading="URL">
                    <Input
                        placeholder="Social profile link or any URL"
                        style={styles.textInput}
                        value={props.url}
                        onChangeText={text => props.inputHandler("url", text)}
                    />
                </Tab>
            </Tabs>

            <Button info style={styles.button} onPress={props.handlePersonSubmit}>
                <Text style={styles.buttonText}> Search </Text>
            </Button>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        margin: 5
    },

    header: {
        flexDirection: "row",
        textAlign: "center",
        justifyContent: "space-between",
        marginBottom: 25
    },

    intro: {
        padding: 10,
        fontSize: 15
    },

    textInput: {
        borderColor: "#64aab8",
        borderWidth: 1,
        borderStyle: "solid",
        flex: 2
    },

    textInputSmall: {
        flex: 1
    },
    nameInput: {
        flexDirection: "row"
    },

    button: {
        margin: 10,
        padding: 10
    },

    tab: {
        backgroundColor: "white"
    },

    buttonText: {
        color: "white"
    },

    link: {
        color: "#64aab8",
        lineHeight: 17,
        padding: 15,
        backgroundColor: "rgb(216,236,240)",
        borderRadius: 10
    }
});

export default ChangeTabs;