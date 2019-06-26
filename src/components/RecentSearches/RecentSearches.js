import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { setRecentSearches } from '../../store/actions';
import constants from '../../helpers/constants';

class RecentSearches extends Component {
  async componentDidMount() {
    try {
      const storageSearches = await AsyncStorage.getItem('recentSearches');
      console.log('STORAGE', storageSearches);
      if (storageSearches !== null) {
        this.props.setRecentSearches(JSON.parse(storageSearches));
      }
    } catch (error) {
      console.log(error);
    }
  }

  //   handleRecentSearchPress = search => {
  //     this.props.handleSearch(search.formattedObject)
  //   }

  render() {
    const { recentSearches } = this.props;

    return (
      <View style={{ padding: 20 }}>
        <Text>Recent Searches:</Text>
        {!!recentSearches.length ? (
          recentSearches.map((search, i) => (
            <TouchableOpacity
              key={i}
              style={styles.recentSearchButton}
              onPress={() => this.props.handleSearch(search.formattedObject)}
            >
              <Text style={styles.recentSearchButtonText}>
                {search.searchInput}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <ActivityIndicator />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  recentSearchButton: {
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  recentSearchButtonText: {
    fontSize: 20,
    color: `${constants.highlightColor}`
  }
});

const mapStateToProps = state => {
  const { recentSearches } = state.recentSearches;
  return {
    recentSearches
  };
};

export default connect(
  mapStateToProps,
  { setRecentSearches }
)(RecentSearches);