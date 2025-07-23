// src/lib/search/searchService.ts
// Search & Filter Engine using Fuse.js
import Fuse from 'fuse.js';

export interface SearchItem {
  id: string;
  [key: string]: string | number | boolean | undefined;
}

export interface SearchOptions {
  keys: string[];
  threshold?: number;
}

export class SearchService<T extends SearchItem> {
  private fuse: Fuse<T>;

  constructor(data: T[], options: SearchOptions) {
    this.fuse = new Fuse(data, {
      keys: options.keys,
      threshold: options.threshold ?? 0.3,
    });
  }

  search(query: string): T[] {
    return this.fuse.search(query).map((result) => result.item);
  }
}
