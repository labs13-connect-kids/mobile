import HeaderTitle from './../components/HeaderTitle';
import logoImg from '../../assets/simple-logo.png';
import {
  Image,
  Platform,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native';
import { Icon } from 'native-base';
import React from 'react';
import { sendEvent } from '../helpers/createEvent';

export default (headerConfig = (title, navigation) => {
  return {
    headerTitle: <HeaderTitle title={title} navigation={navigation} />,
    headerLeft:
      Platform.OS === 'ios' ? (
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('BestPractices');
            sendEvent(email, 'click', 'logo');
          }}
        >
          <Image
            source={logoImg}
            style={styles.imageStyles}
            resizeMode="contain"
          />
        </TouchableWithoutFeedback>
      ) : null,
    headerRight: (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.toggleDrawer();
        }}
      >
        <Icon ios="ios-menu" android="md-menu" style={styles.iconStyles} />
      </TouchableWithoutFeedback>
    )
  };
});

const styles = StyleSheet.create({
  imageStyles: { width: 40, height: 40, marginHorizontal: 20 },
  iconStyles: { fontSize: 40, color: '#000', paddingRight: 20 }
});
