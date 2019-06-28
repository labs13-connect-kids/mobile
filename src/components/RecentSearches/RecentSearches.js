import React, { Component } from 'react';
import {
  AsyncStorage,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'native-base';
import {
  populatePerson,
  populateSearchResults,
  setRecentSearches
} from '../../store/actions';
import constants from '../../helpers/constants';

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

  // async componentDidUpdate(prevProps) {
  //   console.log('CDM RECENT');
  //   let cache = await AsyncStorage.getItem('recentSearchesCache');
  //   if (cache !== null) {
  //     cache = JSON.parse(cache);
  //     console.log('PREVPROPS', prevProps.recentSearches);
  //     if (
  //       prevProps.recentSearches.length &&
  //       prevProps.recentSearches[0].searchInput !==
  //         cache.cacheOrder[0].searchInput
  //     ) {
  //       console.log('PREVPROPS II', prevProps.recentSearches);
  //       this.props.setRecentSearches(cache.cacheOrder);
  //     }
  //   }
  // }

  clearRecentSearches = async () => {
    try {
      await AsyncStorage.removeItem('recentSearchesCache');
      this.props.setRecentSearches([]);
    } catch (error) {
      console.log(error);
    }
  };

  displayRecentSearch = data => {
    if (!data.length) {
      // If a person
      this.props.populatePerson(data);
      this.props.navigation.navigate('SearchResult');
    } else {
      this.props.populateSearchResults(data);
    }
  };

  render() {
    const { recentSearches, recentSearchesLoaded } = this.props;

    return (
      <View style={{ padding: 20 }}>
        <Text>Recent Searches:</Text>
        {recentSearchesLoaded ? (
          <>
            {recentSearches.length ? (
              <View>
                {recentSearches.map(({ data, searchType, searchInput }, i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.recentSearchButton}
                    onPress={() => this.displayRecentSearch(data)}
                  >
                    <Text style={styles.recentSearchButtonText}>
                      {searchInput}
                    </Text>
                  </TouchableOpacity>
                ))}
                <Button
                  style={styles.clearButton}
                  danger
                  onPress={this.clearRecentSearches}
                >
                  <Text style={styles.clearButtonText}>Clear</Text>
                </Button>
              </View>
            ) : null}
          </>
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
  },
  clearButton: {
    padding: 20
  },
  clearButtonText: {
    color: '#fff'
  }
});

const mapStateToProps = state => {
  const { recentSearches, recentSearchesLoaded } = state.recentSearches;
  return {
    recentSearches,
    recentSearchesLoaded
  };
};

export default connect(
  mapStateToProps,
  { populatePerson, populateSearchResults, setRecentSearches }
)(RecentSearches);
