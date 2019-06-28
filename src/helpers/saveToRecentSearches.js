import { AsyncStorage } from 'react-native';
import { parse, stringify } from 'flatted/esm';
import LRUCache from '../helpers/LRUCache';

async function saveToRecentSearches(newSearch) {
  try {
    let storageSearches = await AsyncStorage.getItem('recentSearchesCache');
    if (!storageSearches) {
      storageSearches = new LRUCache();
    } else {
      storageSearches = JSON.parse(storageSearches);
      console.log(storageSearches);

      storageSearches.__proto__ = new LRUCache();
    }
    storageSearches.put(newSearch);
    console.log('AFTER PUT', storageSearches);
    await AsyncStorage.setItem(
      'recentSearchesCache',
      JSON.stringify(storageSearches)
    );
  } catch (error) {
    console.log(error);
  }
}

export default saveToRecentSearches;
