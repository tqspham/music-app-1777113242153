'use client';

import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface PlaybackControlsProps {
  onPlay: () => void;
  onPause: () => void;
  onSkipNext: () => void;
  onSkipPrevious: () => void;
  isPlaying: boolean;
  canSkipNext: boolean;
  canSkipPrevious: boolean;
}

export default function PlaybackControls({
  onPlay,
  onPause,
  onSkipNext,
  onSkipPrevious,
  isPlaying,
  canSkipNext,
  canSkipPrevious,
}: PlaybackControlsProps): React.ReactElement {
  return (
    <div className="flex items-center justify-center gap-4 rounded-lg bg-slate-800 p-6 shadow-lg">
      <button
        onClick={onSkipPrevious}
        disabled={!canSkipPrevious}
        className={twMerge(
          'rounded-full p-2 transition-colors',
          canSkipPrevious
            ? 'bg-slate-700 text-white hover:bg-slate-600'
            : 'bg-slate-700 text-slate-500 cursor-not-allowed'
        )}
        aria-label="Previous song (Left arrow)"
      >
        <SkipBack size={24} />
      </button>

      <button
        onClick={isPlaying ? onPause : onPlay}
        className="rounded-full bg-blue-600 p-3 text-white transition-colors hover:bg-blue-700"
        aria-label={isPlaying ? 'Pause (Spacebar)' : 'Play (Spacebar)'}
      >
        {isPlaying ? <Pause size={28} /> : <Play size={28} />}
      </button>

      <button
        onClick={onSkipNext}
        disabled={!canSkipNext}
        className={twMerge(
          'rounded-full p-2 transition-colors',
          canSkipNext
            ? 'bg-slate-700 text-white hover:bg-slate-600'
            : 'bg-slate-700 text-slate-500 cursor-not-allowed'
        )}
        aria-label="Next song (Right arrow)"
      >
        <SkipForward size={24} />
      </button>
    </div>
  );
}