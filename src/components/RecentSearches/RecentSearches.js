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
  setRecentSearches,
  stopSavingRecentSearches
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
      } else {
        this.props.setRecentSearches([]);
      }
    } catch (error) {
      // console.log('Recent Searches Error: ', error);
    }
  }

  async componentDidUpdate(prevProps) {
    // console.log('CDM RECENT');
    // set boolean
    if (this.props.isSavingRecentSearches) {
      // console.log('CDM INSIDE');
      let cache = await AsyncStorage.getItem('recentSearchesCache');
      cache = JSON.parse(cache);
      if (cache !== null) {
        this.props.setRecentSearches(cache.cacheOrder);
      }
      this.props.stopSavingRecentSearches();
    }
  }

  clearRecentSearches = async () => {
    try {
      await AsyncStorage.removeItem('recentSearchesCache');
      this.props.setRecentSearches([]);
    } catch (error) {
      // console.log('Clear Recent Searches Error: ', error);
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
        <Text style={styles.recentSearchesText}>Recent Searches:</Text>
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
            ) : (
              <Text style={styles.noRecentSearchesText}>
                Start searching to save your most recent search results!
              </Text>
            )}
          </>
        ) : (
          <ActivityIndicator />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  recentSearchesText: {
    fontFamily: `${constants.fontFamily}`
  },
  recentSearchButton: {
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  recentSearchButtonText: {
    fontSize: 20,
    color: `${constants.highlightColor}`,
    fontFamily: `${constants.fontFamily}`
  },
  clearButton: {
    padding: 20
  },
  clearButtonText: {
    color: '#fff'
  },
  noRecentSearchesText: {
    color: `${constants.highlightColor}`,
    fontFamily: `${constants.fontFamily}`
  }
});

const mapStateToProps = state => {
  const {
    isSavingRecentSearches,
    recentSearches,
    recentSearchesLoaded
  } = state.recentSearches;

  return {
    isSavingRecentSearches,
    recentSearches,
    recentSearchesLoaded
  };
};

export default connect(
  mapStateToProps,
  {
    populatePerson,
    populateSearchResults,
    setRecentSearches,
    stopSavingRecentSearches
  }
)(RecentSearches);
