import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Col, Row, Text } from 'native-base';
import { styles } from '../../styles';
import renderMaskedOrResult from '../../helpers/renderMaskedOrResult';
import { connect } from 'react-redux';
import { showModal } from '../../store/actions';

const PersonInfoRow = ({
  isLoggedIn,
  item,
  itemKey,
  itemValue,
  startRegister,
  title,
  showConModal
}) => {
  if (item[itemKey]) {
    handlePressDirections = (data, postalCode, city) => {
      console.log('DATA', data);
      console.log('POSTAL CODE', postalCode);
      console.log('CITY', city);

      if (postalCode === undefined) {
        let address = `${city}, ${data}`;
        console.log(address);
        const type = 'address';
        showConModal(address, type);
      } else {
        let address = `${city}, ${data} ${postalCode}`;
        console.log(address);
        const type = 'address404';
        showConModal(address, type);
      }
    };

    let handleShowConModal = key => {
      if (!isLoggedIn) startRegister();

      if (isLoggedIn && itemKey === 'emails') {
        const type = 'email';
        showConModal(key, type, index);
      }

      if (isLoggedIn && itemKey === 'phones') {
        const type = 'phone';
        showConModal(key, type, index);
      }

      if (isLoggedIn && itemKey === 'addresses') {
        if (key.zip_code === undefined) {
          let address = `${key.display}`;
          console.log('NO ZIP_CODE FOUND');
          let type = 'address';
          console.log('ADDRESS', `${key.display}`);
          showConModal(address, type, index);
        } else if (key.house === undefined) {
          if (key.street === undefined) {
            let data = `${key.state}`;
            handlePressDirections(data, key['zip_code'], key['city']);
          } else {
            let data = `${key.street} ${key.state}`;
            handlePressDirections(data, key['zip_code'], key['city']);
          }
        } else if (key.zip_code === undefined) {
          let address = `${key.display}`;
          let type = 'address';
          console.log('ADDRESS', `${key.display}`);
          showConModal(address, type, index);
        } else {
          let address = `${key.display}, ${key.zip_code}`;
          let type = 'address';
          console.log('ADDRESS', `${key.display}`);
          showConModal(address, type, index);
        }
      }

      if (isLoggedIn && itemKey === 'urls') {
        const type = 'url';
        showConModal(key, type, index);
      }
      if (isLoggedIn && itemKey === 'relationships') {
        const type = 'name';
        showConModal(key, type, index);
      }
    };
    return (
      <Row style={styles.rowContainer}>
        <Col size={30} style={styles.rowLabel}>
          <Text style={styles.rowLabelText}>{title}</Text>
        </Col>
        <Col size={70} style={styles.colList}>
          {item[itemKey].map((key, index) => {
            if (itemKey === 'addresses') {
              return (
                <TouchableOpacity
                  style={styles.colListContainer}
                  key={index}
                  onPress={() => handleShowConModal(key, index)}
                >
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
                <TouchableOpacity
                  style={styles.colListContainer}
                  key={index}
                  onPress={() =>
                    handleShowConModal(key[itemValue][0].display, index)
                  }
                >
                  <Text style={styles.colListText}>
                    {renderMaskedOrResult(key[itemValue][0].display, itemKey)}
                  </Text>
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity style={styles.colListContainer} key={index}>
                  <Text
                    style={styles.colListText}
                    onPress={() => handleShowConModal(key, index)}
                  >
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
const mapStateToProps = state => {
  const { isLoggedIn } = state.auth;
  const { modalVisible } = state.confirmationModal;
  return { isLoggedIn, modalVisible };
};

export default connect(
  mapStateToProps,
  { showModal }
)(PersonInfoRow);
