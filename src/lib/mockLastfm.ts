import type { LastFmUser, Artist, Track, Album } from './types';

const mockUsers: Record<string, LastFmUser> = {
  'rj': {
    name: 'rj',
    playcount: '47832',
    artist_count: '1243',
    track_count: '8921',
    album_count: '2156',
  },
  'johndoe': {
    name: 'johndoe',
    playcount: '32104',
    artist_count: '892',
    track_count: '6234',
    album_count: '1543',
  },
  'musiclover': {
    name: 'musiclover',
    playcount: '68945',
    artist_count: '2341',
    track_count: '12456',
    album_count: '3421',
  },
};

const mockArtistsRj: Artist[] = [
  { name: 'Radiohead', playcount: '2341', url: 'https://www.last.fm/music/Radiohead' },
  { name: 'Pink Floyd', playcount: '1892', url: 'https://www.last.fm/music/Pink+Floyd' },
  { name: 'The Beatles', playcount: '1654', url: 'https://www.last.fm/music/The+Beatles' },
  { name: 'Led Zeppelin', playcount: '1432', url: 'https://www.last.fm/music/Led+Zeppelin' },
  { name: 'David Bowie', playcount: '1287', url: 'https://www.last.fm/music/David+Bowie' },
  { name: 'Tame Impala', playcount: '1124', url: 'https://www.last.fm/music/Tame+Impala' },
  { name: 'Arctic Monkeys', playcount: '987', url: 'https://www.last.fm/music/Arctic+Monkeys' },
  { name: 'The Strokes', playcount: '876', url: 'https://www.last.fm/music/The+Strokes' },
  { name: 'Arcade Fire', playcount: '743', url: 'https://www.last.fm/music/Arcade+Fire' },
  { name: 'Fleetwood Mac', playcount: '698', url: 'https://www.last.fm/music/Fleetwood+Mac' },
];

const mockArtistsJohnDoe: Artist[] = [
  { name: 'The Beatles', playcount: '2876', url: 'https://www.last.fm/music/The+Beatles' },
  { name: 'Radiohead', playcount: '2234', url: 'https://www.last.fm/music/Radiohead' },
  { name: 'Queen', playcount: '1543', url: 'https://www.last.fm/music/Queen' },
  { name: 'Nirvana', playcount: '1321', url: 'https://www.last.fm/music/Nirvana' },
  { name: 'Led Zeppelin', playcount: '1198', url: 'https://www.last.fm/music/Led+Zeppelin' },
  { name: 'The Rolling Stones', playcount: '987', url: 'https://www.last.fm/music/The+Rolling+Stones' },
  { name: 'AC/DC', playcount: '876', url: 'https://www.last.fm/music/AC%2FDC' },
  { name: 'Metallica', playcount: '743', url: 'https://www.last.fm/music/Metallica' },
  { name: 'Pearl Jam', playcount: '654', url: 'https://www.last.fm/music/Pearl+Jam' },
  { name: 'Foo Fighters', playcount: '543', url: 'https://www.last.fm/music/Foo+Fighters' },
];

const mockArtistsMusicLover: Artist[] = [
  { name: 'Taylor Swift', playcount: '3421', url: 'https://www.last.fm/music/Taylor+Swift' },
  { name: 'Billie Eilish', playcount: '2987', url: 'https://www.last.fm/music/Billie+Eilish' },
  { name: 'The Weeknd', playcount: '2543', url: 'https://www.last.fm/music/The+Weeknd' },
  { name: 'Arctic Monkeys', playcount: '2123', url: 'https://www.last.fm/music/Arctic+Monkeys' },
  { name: 'Lana Del Rey', playcount: '1876', url: 'https://www.last.fm/music/Lana+Del+Rey' },
  { name: 'Frank Ocean', playcount: '1654', url: 'https://www.last.fm/music/Frank+Ocean' },
  { name: 'SZA', playcount: '1432', url: 'https://www.last.fm/music/SZA' },
  { name: 'Tame Impala', playcount: '1298', url: 'https://www.last.fm/music/Tame+Impala' },
  { name: 'Tyler, the Creator', playcount: '1087', url: 'https://www.last.fm/music/Tyler,+the+Creator' },
  { name: 'Doja Cat', playcount: '943', url: 'https://www.last.fm/music/Doja+Cat' },
];

const artistMap: Record<string, Artist[]> = {
  'rj': mockArtistsRj,
  'johndoe': mockArtistsJohnDoe,
  'musiclover': mockArtistsMusicLover,
};

export class MockLastFmAPI {
  async getUserInfo(username: string): Promise<LastFmUser> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = mockUsers[username.toLowerCase()];
    if (!user) {
      throw new Error(`User not found: ${username}`);
    }
    return user;
  }

  async getTopArtists(username: string, limit: number = 50, period: string = 'overall'): Promise<Artist[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const artists = artistMap[username.toLowerCase()] || [];
    return artists.slice(0, limit);
  }

  async getTopTracks(username: string, limit: number = 50, period: string = 'overall'): Promise<Track[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return [
      {
        name: 'Karma Police',
        playcount: '234',
        artist: { name: 'Radiohead' },
        url: 'https://www.last.fm/music/Radiohead/_/Karma+Police',
      },
      {
        name: 'Comfortably Numb',
        playcount: '198',
        artist: { name: 'Pink Floyd' },
        url: 'https://www.last.fm/music/Pink+Floyd/_/Comfortably+Numb',
      },
    ].slice(0, limit);
  }

  async getTopAlbums(username: string, limit: number = 50, period: string = 'overall'): Promise<Album[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return [
      {
        name: 'OK Computer',
        playcount: '456',
        artist: { name: 'Radiohead' },
        url: 'https://www.last.fm/music/Radiohead/OK+Computer',
      },
    ].slice(0, limit);
  }

  async getRecentTracks(username: string, limit: number = 10): Promise<Track[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        name: 'No Surprises',
        playcount: '1',
        artist: { name: 'Radiohead' },
        url: 'https://www.last.fm/music/Radiohead/_/No+Surprises',
      },
    ].slice(0, limit);
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
