import React from 'react';
import { Text, View } from 'react-native';

const PersonInfo = ({ item }) => {
  return (
    <View>
      <Text>{item.names[0].display}</Text>
    </View>
  );
};

export default PersonInfo;
