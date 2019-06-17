import React from 'react';
import { View } from 'react-native';
import { Col, Row, Text } from 'native-base';
import { styles } from '../../styles';
import renderMaskedOrResult from '../../helpers/renderMaskedOrResult';

const PersonInfoRow = ({ item, itemKey, itemValue, title }) => {
  return (
    <Row style={styles.rowContainer}>
      <Col size={30} style={styles.rowLabel}>
        <Text style={styles.labelText}>{title}</Text>
      </Col>
      <Col size={70} style={styles.colList}>
        {item.emails &&
          item[itemKey].map(key => {
            if (itemKey === 'addresses') {
              return (
                <View style={styles.colListContainer}>
                  <Text style={styles.colListText}>
                    {renderMaskedOrResult(key.house, 'house')}{' '}
                    {renderMaskedOrResult(key.street, 'street')}
                    {'\n'}
                    {key[itemValue]}{' '}
                    {renderMaskedOrResult(key.zip_code, 'zip_code')}
                  </Text>
                </View>
              );
            } else {
              return (
                <View style={styles.colListContainer}>
                  <Text style={styles.colListText}>
                    {renderMaskedOrResult(key[itemValue], itemKey)}
                  </Text>
                  {key['@type'] && (
                    <Text style={styles.colListLabelText}>{key['@type']}</Text>
                  )}
                </View>
              );
            }
          })}
      </Col>
    </Row>
  );
};

export default PersonInfoRow;
