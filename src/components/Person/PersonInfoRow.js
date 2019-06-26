import React from 'react';
import { TouchableOpacity , Linking , Platform , Alert } from 'react-native';
import { Col, Row, Text } from 'native-base';
import { styles } from '../../styles';
import renderMaskedOrResult from '../../helpers/renderMaskedOrResult';
import { connect } from 'react-redux'

const PersonInfoRow = ({ isLoggedIn , item, itemKey, itemValue, title }) => {
  if (item[itemKey]) {

    handlePressDirections = ( address, postalCode, city ) => {

      let daddr = encodeURIComponent(`${address} ${postalCode}, ${city}`);
      console.log( daddr )
      if (Platform.OS === 'ios') {
        Linking.openURL(`http://maps.apple.com/?daddr=${daddr}`);
      } else {
        Linking.openURL(`http://maps.google.com/?daddr=${daddr}`);
      }
    };
    
    let OnPress = ( key ) => {
      console.log( 'THIS IS KEY', key )
      if ( isLoggedIn ) {
        if ( itemKey === 'emails' ) {
          // console.log( 'key and item value', key[itemValue] )
          Linking.openURL( `mailto:${key[itemValue]}`);
        } else if ( itemKey === 'phones' ) {
          Linking.openURL( `tel:${key[itemValue]}`);
        } else if ( itemKey === 'urls' ) {
          Linking.openURL( `http:${key['url']}`);
        } else if ( itemKey === 'addresses' ) {
          let address = `${key.house} ${key.street}`;
          handlePressDirections( address, key['zip_code'] , key['city'] );
        }
      } else {
        return Alert.alert('Go away')
      }
    }
    
    return (
      <Row style={styles.rowContainer}>
        <Col size={30} style={styles.rowLabel}>
          <Text style={styles.rowLabelText}>{title}</Text>
        </Col>
        <Col size={70} style={styles.colList}>
          {item[itemKey].map((key, index) => {
            if (itemKey === 'addresses') {
              return (
                <TouchableOpacity style={styles.colListContainer} key={index} onPress = { () => OnPress( key ) }>
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

                <TouchableOpacity style = { styles.colListContainer } key = { index }>
                  <Text style = { styles.colListText } 
                    onPress = { () => OnPress( key ) }>
                    { renderMaskedOrResult( key[itemValue] , itemKey )}
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
  const { isLoggedIn } = state.auth
  return { isLoggedIn };
};

export default connect( 
  mapStateToProps,
  {  }  
)(PersonInfoRow);
