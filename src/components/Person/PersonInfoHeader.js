import React from 'react';
import { Image } from 'react-native';
import { Col, Row, Text } from 'native-base';
import constants from '../../helpers/constants';
import { styles } from '../../styles';

const PersonInfoHeader = ({ item }) => {
  let secondLine = '';
  let uri = item.images
    ? `https://dev.search.connectourkids.org/api/thumbnail?tokens=${
        item.images[0].thumbnail_token
      }`
    : constants.defaultImageUri;

  if (item.dob && item.gender) {
    secondLine += `${item.dob.display}, ${item.gender.content}`;
  } else if (item.gender) {
    secondLine += `${item.gender.content}`;
  } else if (item.dob) {
    secondLine += `${item.dob.display}`;
  }

  return (
    <Row style={styles.rowContainer}>
      <Col size={30} style={styles.imageContainer}>
        <Image
          style={styles.rowImage}
          source={{
            uri: uri
          }}
        />
      </Col>
      <Col size={70} style={styles.colList}>
        <Text style={styles.cardNameText}>
          {item.names && item.names[0].display}
        </Text>
        {secondLine.length && (
          <Text style={[styles.cardInformationText, { marginBottom: 5 }]}>
            {secondLine}
          </Text>
        )}
      </Col>
    </Row>
  );
};

export default PersonInfoHeader;
