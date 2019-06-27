import { AsyncStorage } from 'react-native';

// need to add this in
const capcity = 3;

// class LinkedList {
//   constructor() {
//     this.head = null;
//   }
// }

// class ListNode {
//   constructor(data) {
//     this.data = data;
//     this.next = null;
//   }
// }

async function saveToRecentSearches(newSearch) {
  try {
    let storageSearches = await AsyncStorage.getItem('recentSearches');
    storageSearches = !storageSearches ? [] : JSON.parse(storageSearches);

    if (!storageSearches.length) {
      storageSearches.push(newSearch);
    } else if (storageSearches.length < capcity) {
      storageSearches.unshift(newSearch);
    } else {
      // remove oldest search
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
