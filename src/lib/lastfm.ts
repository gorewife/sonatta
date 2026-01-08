import type { LastFmUser, Artist, Track, Album } from './types';
import { MockLastFmAPI } from './mockLastfm';

const API_KEY = import.meta.env.VITE_LASTFM_API_KEY || 'YOUR_LASTFM_API_KEY';
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true';

export class LastFmAPI {
  private apiKey: string;

  constructor(apiKey: string = API_KEY) {
    this.apiKey = apiKey;
  }

  private async fetchFromLastFm(params: Record<string, string>) {
    const url = new URL(BASE_URL);
    url.searchParams.append('api_key', this.apiKey);
    url.searchParams.append('format', 'json');
    
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Last.fm API error: ${response.statusText}`);
    }
    return response.json();
  }

  async getUserInfo(username: string): Promise<LastFmUser> {
    const data = await this.fetchFromLastFm({
      method: 'user.getinfo',
      user: username,
    });
    return data.user;
  }

  async getTopArtists(username: string, limit: number = 50, period: string = 'overall'): Promise<Artist[]> {
    const data = await this.fetchFromLastFm({
      method: 'user.gettopartists',
      user: username,
      limit: limit.toString(),
      period,
    });
    return data.topartists?.artist || [];
  }

  async getTopTracks(username: string, limit: number = 50, period: string = 'overall'): Promise<Track[]> {
    const data = await this.fetchFromLastFm({
      method: 'user.gettoptracks',
      user: username,
      limit: limit.toString(),
      period,
    });
    return data.toptracks?.track || [];
  }

  async getTopAlbums(username: string, limit: number = 50, period: string = 'overall'): Promise<Album[]> {
    const data = await this.fetchFromLastFm({
      method: 'user.gettopalbums',
      user: username,
      limit: limit.toString(),
      period,
    });
    return data.topalbums?.album || [];
  }

  async getRecentTracks(username: string, limit: number = 10): Promise<Track[]> {
    const data = await this.fetchFromLastFm({
      method: 'user.getrecenttracks',
      user: username,
      limit: limit.toString(),
    });
    return data.recenttracks?.track || [];
  }

  async compareUsers(user1: string, user2: string) {
    const [artists1, artists2] = await Promise.all([
      this.getTopArtists(user1, 100),
      this.getTopArtists(user2, 100),
    ]);

    const artistNames1 = new Set(artists1.map(a => a.name.toLowerCase()));
    const artistNames2 = new Set(artists2.map(a => a.name.toLowerCase()));

    const commonArtists = artists1.filter(a => 
      artistNames2.has(a.name.toLowerCase())
    );

    const user1Only = artists1.filter(a => 
      !artistNames2.has(a.name.toLowerCase())
    ).slice(0, 10);

    const user2Only = artists2.filter(a => 
      !artistNames1.has(a.name.toLowerCase())
    ).slice(0, 10);

    const intersection = commonArtists.length;
    const union = artistNames1.size + artistNames2.size - intersection;
    const tasteCompatibility = union > 0 ? (intersection / union) * 100 : 0;

    return {
      commonArtists: commonArtists.slice(0, 20),
      user1Only,
      user2Only,
      tasteCompatibility,
    };
  }
}

export const lastfm = USE_MOCK_API ? new MockLastFmAPI() : new LastFmAPI();
