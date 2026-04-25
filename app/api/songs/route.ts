export const dynamic = 'force-dynamic';

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number;
  audioUrl: string;
}

interface ApiResponse {
  songs: Song[];
  totalCount: number;
}

const mockSongs: Song[] = [
  {
    id: '1',
    title: 'Sunset Dreams',
    artist: 'The Melodians',
    duration: 243,
    audioUrl:
      'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: '2',
    title: 'Neon Nights',
    artist: 'Synth Wave Collective',
    duration: 287,
    audioUrl:
      'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: '3',
    title: 'Ocean Waves',
    artist: 'Coastal Harmony',
    duration: 215,
    audioUrl:
      'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    id: '4',
    title: 'Urban Jungle',
    artist: 'City Beats',
    duration: 256,
    audioUrl:
      'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
  {
    id: '5',
    title: 'Mountain Echo',
    artist: 'Alpine Resonance',
    duration: 198,
    audioUrl:
      'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  },
  {
    id: '6',
    title: 'Starlight Serenade',
    artist: 'Cosmic Strings',
    duration: 272,
    audioUrl:
      'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
  },
  {
    id: '7',
    title: 'Midnight Blues',
    artist: 'Jazz Collective',
    duration: 234,
    audioUrl:
      'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
  },
  {
    id: '8',
    title: 'Forest Whispers',
    artist: 'Nature Sounds',
    duration: 210,
    audioUrl:
      'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
  },
  {
    id: '9',
    title: 'Electric Dreams',
    artist: 'Digital Horizons',
    duration: 265,
    audioUrl:
      'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
  },
  {
    id: '10',
    title: 'Ethereal Journey',
    artist: 'Ambient Masters',
    duration: 289,
    audioUrl:
      'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
  },
];

export async function GET(): Promise<Response> {
  await new Promise((resolve) => setTimeout(resolve, 750));

  const response: ApiResponse = {
    songs: mockSongs,
    totalCount: mockSongs.length,
  };

  return Response.json(response, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}