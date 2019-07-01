import { AsyncStorage } from 'react-native';
import LRUCache from '../helpers/LRUCache';

async function saveToRecentSearches(newSearch) {
  try {
    let storageSearches = await AsyncStorage.getItem('recentSearchesCache');
    if (!storageSearches) {
      storageSearches = new LRUCache();
    } else {
      storageSearches = JSON.parse(storageSearches);
      // give the LRU Cache class it's proto back
      storageSearches.__proto__ = new LRUCache();
    }
    storageSearches.put(newSearch);
    await AsyncStorage.setItem(
      'recentSearchesCache',
      JSON.stringify(storageSearches)
    );
  } catch (error) {
    // console.log('SaveToRecentSearches Error: ', error);
  }
}

export default saveToRecentSearches;
