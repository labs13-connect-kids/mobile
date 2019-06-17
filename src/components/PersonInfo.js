import React from 'react';
import { Text, View } from 'react-native';

const renderMaskedOrResult = (field, type) => {
  if (field !== 'value available in full api response') {
    return field;
  }

  switch (type) {
    case 'house':
      return '****';
      break;
    case 'street':
      return '********* **';
    case 'zip_code':
      return '*****';
    default:
      break;
  }
};

const PersonInfo = ({ item }) => {
  return (
    <View>
      <Text>{item.names[0].display}</Text>
      <View>
        <Text>Emails</Text>
        <View>
          <Text>Shows emails</Text>
        </View>
      </View>
      <View>
        <Text>Phone Numbers</Text>
        <View>
          <Text>Shows emails</Text>
        </View>
      </View>
      <View>
        <Text>Addresses</Text>
        <View>
          {item.addresses &&
            item.addresses.map(address => {
              return (
                <View>
                  <Text>
                    {renderMaskedOrResult(address.house, 'house')}{' '}
                    {renderMaskedOrResult(address.street, 'street')}
                  </Text>
                  <Text>
                    {address.display}{' '}
                    {renderMaskedOrResult(address.zip_code, 'zip_code')}
                  </Text>
                </View>
              );
            })}
        </View>
      </View>
    </View>
  );
};

export default PersonInfo;
