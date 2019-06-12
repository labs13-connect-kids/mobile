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

const FamilyConnectionsScreen = () => {
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
              <H2>Family Connections</H2>
            </View>
            <Icon
              ios="ios-menu"
              android="md-menu"
              style={{ fontSize: 40, color: '#000' }}
            />
          </View>

          <Text>
            Learn about a revolutionary way to discover and engage extended
            families for at-risk foster youth.
          </Text>
          <View style={{ height: 300, marginBottom: 30 }}>
            <WebView
              style={styles.WebViewContainer}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              source={{ uri: 'https://www.youtube.com/embed/eMivJgf7RNA' }}
            />
          </View>

          <Button style={styles.button} block>
            <Text style={styles.buttonText}>
              I Want To Access Family Connections
            </Text>
          </Button>
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
};

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
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgb(80,141,179)'
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700'
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

export default FamilyConnectionsScreen;