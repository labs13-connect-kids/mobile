import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Col, Row, Text } from 'native-base';
import { styles } from '../../styles';
import renderMaskedOrResult from '../../helpers/renderMaskedOrResult';

const PersonInfoRow = ({ item, itemKey, itemValue, title }) => {
  if (item[itemKey]) {
    return (
      <Row style={styles.rowContainer}>
        <Col size={30} style={styles.rowLabel}>
          <Text style={styles.rowLabelText}>{title}</Text>
        </Col>
        <Col size={70} style={styles.colList}>
          {item[itemKey].map(key => {
            if (itemKey === 'addresses') {
              return (
                <TouchableOpacity style={styles.colListContainer}>
                  <Text style={styles.colListText}>
                    {renderMaskedOrResult(key.house, 'house')}{' '}
                    {renderMaskedOrResult(key.street, 'street')}
                    {'\n'}
                    {key[itemValue]}{' '}
                    {renderMaskedOrResult(key.zip_code, 'zip_code')}
                  </Text>
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity style={styles.colListContainer}>
                  <Text style={styles.colListText}>
                    {renderMaskedOrResult(key[itemValue], itemKey)}
                  </Text>
                  {key['@type'] && (
                    <Text style={styles.colListLabelText}>{key['@type']}</Text>
                  )}
                </TouchableOpacity>
              );
            }
          })}
        </Col>
      </Row>
    );
  } else {
    return null;
  }
};

export default PersonInfoRow;
