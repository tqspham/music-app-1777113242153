import { Music } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number;
  audioUrl: string;
}

type PlaybackStatus = 'idle' | 'playing' | 'paused' | 'error';

interface PlayerProps {
  currentSong?: Song;
  isPlaying: boolean;
  status: PlaybackStatus;
  errorMessage?: string;
}

export default function Player({
  currentSong,
  isPlaying,
  status,
  errorMessage,
}: PlayerProps): React.ReactElement {
  return (
    <div className="rounded-lg bg-slate-800 p-6 shadow-lg">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
            <Music className="text-white" size={24} />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          {currentSong ? (
            <>
              <p className="truncate text-lg font-semibold text-white">{currentSong.title}</p>
              <p className="truncate text-sm text-slate-300">{currentSong.artist}</p>
            </>
          ) : (
            <p className="text-slate-400">No song selected</p>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {status === 'playing' && currentSong && (
          <div className="flex items-center gap-2 text-green-400">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            <span className="text-sm font-medium">Now playing</span>
          </div>
        )}
        {status === 'paused' && currentSong && (
          <div className="text-sm text-slate-300">Paused</div>
        )}
        {status === 'error' && errorMessage && (
          <div className="flex items-center gap-2 text-red-400" role="alert">
            <span className="h-2 w-2 rounded-full bg-red-400" />
            <span className="text-sm">{errorMessage}</span>
          </div>
        )}
        {status === 'idle' && (
          <div className="text-sm text-slate-400">Select a song to begin</div>
        )}
      </div>
    </div>
  );
}