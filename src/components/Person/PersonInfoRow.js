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
          {item[itemKey].map((key, index) => {
            if (itemKey === 'addresses') {
              return (
                <TouchableOpacity style={styles.colListContainer} key={index}>
                  <Text style={styles.colListText}>
                    {key.house && renderMaskedOrResult(key.house, 'house')}{' '}
                    {key.street &&
                      renderMaskedOrResult(key.street, 'street') + '\n'}
                    {key['city'] + ', ' + key['state'] + ' '}
                    {renderMaskedOrResult(key.zip_code, 'zip_code')}
                    {key['@last_seen'] && (
                      <Text style={styles.colListLabelText}>
                        {'\n' + key['@last_seen'].split('-')[0]}
                      </Text>
                    )}
                  </Text>
                </TouchableOpacity>
              );
            } else if (itemKey === 'relationships') {
              return (
                <TouchableOpacity style={styles.colListContainer} key={index}>
                  <Text style={styles.colListText}>
                    {renderMaskedOrResult(key[itemValue][0].display, itemKey)}
                  </Text>
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity style={styles.colListContainer} key={index}>
                  <Text style={styles.colListText}>
                    {renderMaskedOrResult(key[itemValue], itemKey)}
                  </Text>
                  {key['@type'] && (
                    <Text style={styles.colListLabelText}>{key['@type']}</Text>
                  )}

                  {key['@last_seen'] ? (
                    <Text style={styles.colListLabelText}>
                      {key['@last_seen'].split('-')[0]}
                    </Text>
                  ) : (
                    key['@valid_since'] && (
                      <Text style={styles.colListLabelText}>
                        {key['@valid_since'].split('-')[0]}
                      </Text>
                    )
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
