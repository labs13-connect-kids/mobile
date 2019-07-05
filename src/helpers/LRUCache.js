import constants from './constants';

class LRUCache {
  constructor() {
    this.cacheOrder = [];
    this.cacheObject = {};
    this.maxSize = constants.recentSearchesMaxSize;
    this.currentSize = 0;
  }

  insertHead(cacheItem) {
    this.cacheOrder.unshift(cacheItem);
    this.cacheObject[cacheItem.searchInput] = cacheItem;
  }

  moveToHead(cacheItem) {
    const filteredOut = this.cacheOrder.filter(
      item => item.searchInput !== cacheItem.searchInput
    );
    this.cacheOrder = [cacheItem, ...filteredOut];
  }

  removeFromTail() {
    this.currentSize -= 1;
    return this.cacheOrder.pop();
  }

  put(cacheItem) {
    if (this.get(cacheItem) === null) {
      this.insertHead(cacheItem);
      this.currentSize = this.cacheOrder.length;

      if (this.currentSize > this.maxSize) {
        const removedTail = this.removeFromTail();
        delete this.cacheObject[removedTail.searchInput];
        if (this.currentSize !== this.maxSize) {
          this.currentSize === this.maxSize;
        }
      }
    }
  }

  get(cacheItem) {
    if (!this.cacheObject[cacheItem.searchInput]) {
      return null;
    } else {
      // move cache entry to head
      this.moveToHead(this.cacheObject[cacheItem.searchInput]);
      return this.head;
    }
  }
}

export default LRUCache;
