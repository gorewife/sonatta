export interface LastFmUser {
  name: string;
  playcount: string;
  artist_count?: string;
  track_count?: string;
  album_count?: string;
  image?: Array<{ '#text': string; size: string }>;
}

export interface Artist {
  name: string;
  playcount: string;
  url: string;
  image?: Array<{ '#text': string; size: string }>;
}

export interface Track {
  name: string;
  playcount: string;
  artist: {
    name: string;
  };
  url: string;
  image?: Array<{ '#text': string; size: string }>;
}

export interface Album {
  name: string;
  playcount: string;
  artist: {
    name: string;
  };
  url: string;
  image?: Array<{ '#text': string; size: string }>;
}

export interface ComparisonData {
  commonArtists: Artist[];
  user1Only: Artist[];
  user2Only: Artist[];
  tasteCompatibility: number;
}
