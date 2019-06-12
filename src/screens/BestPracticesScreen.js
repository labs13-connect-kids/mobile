import React from 'react';
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    WebView,
    Platform
} from 'react-native';
import { Container, Button, Icon, H2 } from 'native-base';
import logoImg from '../../assets/simple-logo.png';
import { ScrollView } from 'react-native-gesture-handler';

const BestPracticesScreen = () => {
    return (
        <Container style={styles.container}>
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.header}>

                        <Image
                            source={logoImg}
                            style={{ width: 40, height: 40 }}
                            resizeMode="contain"
                        />
                        <View>

                            <H2>Connect Our Kids</H2>
                            <H2>Best Practices</H2>

                        </View>
                        <Icon
                            ios="ios-menu"
                            android="md-menu"
                            style={{ fontSize: 40, color: '#000' }}
                        />

                    </View>

                    <Text>
                        Connect Our Kids makes free tools for social workers engaged in
                        permanancy searches for foster kids. Watch the video below to learn
                        more about the free tools and resources in this app.
                    </Text>

                    <View style={{ height: 300, marginBottom: 30 }}>

                        <WebView
                            style={styles.WebViewContainer}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            source={{ uri: 'https://www.youtube.com/embed/eMivJgf7RNA' }}
                        />

                    </View>

                    <Button style={styles.button} block transparent>
                        <Text style={styles.buttonText}>
                            People Search - Find Contact Information for Anyone
                        </Text>
                    </Button>

                    <Button style={styles.button} transparent>
                        <Text style={styles.buttonText}>
                            Family Connections - Family Trees for Permanancy
                        </Text>
                    </Button>

                    <Button style={styles.button} transparent>
                        <Text style={styles.buttonText}>
                            Resources - Useful Materials and Information
                        </Text>
                    </Button>

                </ScrollView>
            </SafeAreaView>
        </Container>
    );
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        padding: 20
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 25
    },

    button: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },

    buttonText: {
        color: 'rgb(80,141,179)',
        fontSize: 12,
        textDecorationLine: 'underline'
    },

    textInput: {
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid'
    },

    red: {
        backgroundColor: 'red'
    },

    WebViewContainer: {
        marginTop: Platform.OS == 'ios' ? 20 : 0
    }

});

export default BestPracticesScreen;