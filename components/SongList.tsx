import { twMerge } from 'tailwind-merge';

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number;
  audioUrl: string;
}

interface SongListProps {
  songs: Song[];
  onSelect: (song: Song) => void;
  currentSongId?: string;
  isLoading: boolean;
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function SongList({
  songs,
  onSelect,
  currentSongId,
  isLoading,
}: SongListProps): React.ReactElement {
  return (
    <div className="rounded-lg bg-slate-800 p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-semibold text-white">Playlist</h2>
      <div className="space-y-2">
        {songs.map((song) => (
          <button
            key={song.id}
            onClick={() => onSelect(song)}
            className={twMerge(
              'w-full rounded-lg p-3 text-left transition-colors',
              currentSongId === song.id
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
            )}
            aria-label={`Play ${song.title} by ${song.artist}`}
            disabled={isLoading}
          >
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{song.title}</p>
                <p className="truncate text-sm opacity-75">{song.artist}</p>
              </div>
              <span className="ml-4 flex-shrink-0 text-sm opacity-75">
                {formatDuration(song.duration)}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}