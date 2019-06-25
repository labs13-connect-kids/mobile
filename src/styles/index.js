import { StyleSheet } from 'react-native';
import constants from '../helpers/constants';

export const styles = StyleSheet.create({
  gridContainer: {
    padding: 20,
    alignItems: 'center'
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 20
  },
  rowLabelText: {
    textAlign: 'right',
    fontFamily: constants.fontFamily
  },
  imageContainer: {
    alignItems: 'flex-end'
  },
  rowImage: {
    width: 75,
    height: 75
  },
  colList: {
    marginLeft: 20
  },
  colListContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  colListText: {
    fontFamily: constants.fontFamily,
    color: constants.highlightColor,
    width: '100%'
  },
  colListLabelText: {
    fontSize: 12,
    color: '#bbb',
    fontFamily: constants.fontFamily,
    marginRight: 12
  },
  cardNameText: {
    fontSize: 20,
    fontFamily: constants.fontFamily,
    marginBottom: 5
  },
  cardInformationText: {
    fontFamily: constants.fontFamily,
    fontSize: 14
  }
});
