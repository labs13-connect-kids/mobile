import React from 'react';
import {
    Text,
    View,
    Modal,
    StyleSheet,
    Linking,
    Platform
} from 'react-native';
import { Button } from 'native-base';
import { SafeAreaView } from 'react-navigation';

export const ConfirmationModal = ({ toggleModal, data, type }) => {

    const handlePressDirections = data => {
        let daddr = data;
        console.log(daddr);
        if (Platform.OS === 'ios') {
          Linking.openURL(`http://maps.apple.com/?daddr=${daddr}`);
        } else {
          Linking.openURL(`http://maps.google.com/?daddr=${daddr}`);
        }
    };

    return (
        <>
            <SafeAreaView>
                <View>
                    <Modal>
                        <View style={options.container} >
                            <Text style={options.header}>{type} or Search?</Text>
                            <Text style={options.question}>Would you like to {type}, or perform a search?</Text>
                            <View style={options.buttonContainer}>
                                {/* <Button
                                    onPress={() => toggleModal()}
                                >
                                    <Text style={options.button}>Close</Text>
                                </Button> */}
                                <Button onPress={ () => {
                                    if ( type === 'Email' ) {
                                        console.log('EMAIL TO:', data.address)
                                        Linking.openURL(`mailto:${data.address}`);
                                    }
                                    if ( type === 'Call' ) {
                                        console.log('CALL TO:', data.number)
                                        Linking.openURL(`tel:${data.number}`);
                                    }
                                    if ( type === 'Map' ) {
                                        console.log('MAP TO:', data )
                                        handlePressDirections(data);
                                    }
                                    if ( type === 'View URL' ) {
                                        console.log('URL TO:', data )
                                        Linking.openURL(`${data.url}`);
                                    }
                                } }>
                                    <Text style={options.button}>{type}</Text>
                                </Button>
                                <Button
                                    onPress={() => toggleModal()}
                                >
                                    <Text style={options.button}>Close</Text>
                                </Button>
                            </View>
                        </View>
                    </Modal>
                </View>
            </SafeAreaView>
        </>
    );

}

const options = StyleSheet.create({
    container: {
        marginTop: 100,
        flex: 1,
        padding: 10
    },
    header: {
        fontSize: 23,
        justifyContent: 'center'
    },
    question: {
        fontSize: 17,
        justifyContent: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 15
    },
    button: {
        paddingRight: 15,
        paddingLeft: 15,
    }
})