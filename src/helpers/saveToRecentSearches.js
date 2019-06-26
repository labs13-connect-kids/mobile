import { AsyncStorage } from 'react-native';

// need to add this in
const capcity = 3;

async function saveToRecentSearches(newSearch) {
  try {
    let storageSearches = await AsyncStorage.getItem('recentSearches');
    if (!storageSearches) {
      storageSearches = [];
      storageSearches.push(newSearch);
    } else if (JSON.parse(storageSearches).length < capcity) {
      storageSearches = JSON.parse(storageSearches);
      storageSearches.unshift(newSearch);
    } else {
      // remove oldest search
      storageSearches = JSON.parse(storageSearches);
      storageSearches.pop();
      // add newest search to front
      storageSearches.unshift(newSearch);
    }
    await AsyncStorage.setItem(
      'recentSearches',
      JSON.stringify(storageSearches)
    );
  } catch (error) {
    console.log(error);
  }
}

export default saveToRecentSearches;
