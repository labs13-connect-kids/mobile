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
import { parse, stringify } from 'flatted/esm';

// const mapLRUCache = cache => {
//   const cacheArr = [];
//   let currentEntry = cache.head;
//   while (currentEntry !== null) {
//     cacheArr.push(currentEntry.data);
//     currentEntry = currentEntry.next;
//   }

//   if (!cacheArr.length) {
//     console.log('cache is empty');
//   } else {
//     return cacheArr;
//   }
// };

class RecentSearches extends Component {
  async componentDidMount() {
    try {
      // const storageSearches = await AsyncStorage.getItem('recentSearches');
      let cache = await AsyncStorage.getItem('recentSearchesCache');
      if (cache !== null) {
        cache = JSON.parse(cache);
        let searches = [...cache.cacheOrder];
        this.props.setRecentSearches(searches);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidUpdate(prevProps) {
    // if (prevProps.recentSearches[0] !== this.props.recentSearches[0]) {
    //   let cache = await AsyncStorage.getItem('recentSearchesCache');
    //   if (cache !== null) {
    //     cache = JSON.parse(cache);
    //     console.log('PREVPROPS', prevProps.recentSearches);
    //     if (
    //       prevProps.recentSearches.length &&
    //       prevProps.recentSearches[0].searchInput !==
    //         cache.cacheOrder[0].searchInput
    //     ) {
    //       this.props.setRecentSearches(cache.cacheOrder);
    //     }
    //   }
    // }
  }

  clearRecentSearches = async () => {
    try {
      await AsyncStorage.removeItem('recentSearchesCache');
      this.props.setRecentSearches([]);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { recentSearches } = this.props;

    return (
      <View style={{ padding: 20 }}>
        <Text>Recent Searches:</Text>
        <TouchableOpacity onPress={this.clearRecentSearches}>
          <Text>Clear</Text>
        </TouchableOpacity>
        {!!recentSearches.length ? (
          recentSearches.map(
            ({ formattedObject, searchType, searchInput }, i) => (
              <TouchableOpacity
                key={i}
                style={styles.recentSearchButton}
                onPress={() =>
                  this.props.handleSearch(
                    formattedObject,
                    searchType,
                    searchInput
                  )
                }
              >
                <Text style={styles.recentSearchButtonText}>{searchInput}</Text>
              </TouchableOpacity>
            )
          )
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
