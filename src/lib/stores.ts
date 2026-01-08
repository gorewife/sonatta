import { writable } from 'svelte/store';
import type { LastFmUser, Artist, ComparisonData } from './types';

interface UserCache {
  [username: string]: {
    info: LastFmUser;
    artists: Artist[];
    timestamp: number;
  };
}

interface ComparisonCache {
  [key: string]: {
    data: ComparisonData;
    timestamp: number;
  };
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 min

function createUserStore() {
  const { subscribe, update } = writable<UserCache>({});

  return {
    subscribe,
    set: (username: string, info: LastFmUser, artists: Artist[]) => {
      update(cache => ({
        ...cache,
        [username]: { info, artists, timestamp: Date.now() }
      }));
    },
    get: (username: string) => {
      let cached: UserCache[string] | null = null;
      subscribe(cache => {
        const entry = cache[username];
        if (entry && Date.now() - entry.timestamp < CACHE_DURATION) {
          cached = entry;
        }
      })();
      return cached;
    }
  };
}

function createComparisonStore() {
  const { subscribe, update } = writable<ComparisonCache>({});

  return {
    subscribe,
    set: (user1: string, user2: string, data: ComparisonData) => {
      const key = [user1, user2].sort().join('_');
      update(cache => ({
        ...cache,
        [key]: { data, timestamp: Date.now() }
      }));
    },
    get: (user1: string, user2: string) => {
      const key = [user1, user2].sort().join('_');
      let cached: ComparisonCache[string] | null = null;
      subscribe(cache => {
        const entry = cache[key];
        if (entry && Date.now() - entry.timestamp < CACHE_DURATION) {
          cached = entry;
        }
      })();
      return cached;
    }
  };
}

export const userCache = createUserStore();
export const comparisonCache = createComparisonStore();
export const currentUsers = writable<{ user1: string; user2: string } | null>(null);
