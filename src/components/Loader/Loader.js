import React from 'react';
import { Image, View } from 'react-native';

const Loader = () => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
      }}
    >
      <Image
        source={require('../../../assets/loading.gif')}
        style={{ width: 80, height: 80 }}
      />
    </View>
  );
};

export default Loader;
