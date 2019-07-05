import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { Button, Tabs, Tab, Input, Container, Content, Header } from 'native-base';

const InputDisplay = (props) => {
    return(
        <View style={styles.nameInputFullWidth}>
            <Input
                placeholder="First and last, middle optional"
                style={[styles.textInput, !props.inputValidate ? styles.error : null]}
                value={props.name}
                onChangeText={props.inputHandlerName}
            />
            <Input
                placeholder="City, State"
                // style={styles.textInput}
                style={styles.textInput}
                value={props.cityState}
                onChangeText={props.inputHandlerCityState}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    error: {
        borderWidth: 3,
        borderColor: 'red'
    },
    textInput: {
        borderColor: '#64aab8',
        borderWidth: 1,
        borderStyle: 'solid',
        width: '100%'
    },
    nameInputFullWidth: {
        flex: 1,
    }
});
export default InputDisplay;