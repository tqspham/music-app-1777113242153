import { useState, useEffect, useRef, useCallback } from 'react';
import SongList from '@/components/SongList';
import Player from '@/components/Player';
import PlaybackControls from '@/components/PlaybackControls';
import VolumeSlider from '@/components/VolumeSlider';
import PlaybackProgress from '@/components/PlaybackProgress';
import LoadingState from '@/components/LoadingState';
import EmptyState from '@/components/EmptyState';
import ErrorBoundary from '@/components/ErrorBoundary';

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number;
  audioUrl: string;
}

interface PlaybackState {
  currentSongId?: string;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  queue: Song[];
  queueIndex: number;
}

type PlaybackStatus = 'idle' | 'playing' | 'paused' | 'error';

export default function Home(): React.ReactElement {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playbackState, setPlaybackState] = useState<PlaybackState>({
    currentSongId: undefined,
    isPlaying: false,
    currentTime: 0,
    volume: 100,
    queue: [],
    queueIndex: 0,
  });
  const [playbackStatus, setPlaybackStatus] = useState<PlaybackStatus>('idle');
  const [playbackError, setPlaybackError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSongs = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/songs');
        if (!response.ok) {
          throw new Error('Failed to fetch songs');
        }
        const data: { songs: Song[]; totalCount: number } = await response.json();
        setSongs(data.songs);
        setPlaybackState((prev) => ({ ...prev, queue: data.songs }));
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = playbackState.volume / 100;
    }
  }, [playbackState.volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = (): void => {
      setPlaybackState((prev) => ({
        ...prev,
        currentTime: audio.currentTime,
      }));
    };

    const handleEnded = (): void => {
      handleSkipNext();
    };

    const handleError = (): void => {
      setPlaybackStatus('error');
      setPlaybackError('Audio playback failed. The song may be unavailable.');
      setPlaybackState((prev) => ({ ...prev, isPlaying: false }));
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playbackState.isPlaying) {
      audio.play().catch(() => {
        setPlaybackStatus('error');
        setPlaybackError('Failed to play audio.');
        setPlaybackState((prev) => ({ ...prev, isPlaying: false }));
      });
    } else {
      audio.pause();
    }
  }, [playbackState.isPlaying, playbackState.currentSongId]);

  const currentSong = songs.find((s) => s.id === playbackState.currentSongId);

  const handleSongSelect = useCallback(
    (song: Song): void => {
      const audio = audioRef.current;
      if (!audio || !song.audioUrl) {
        setPlaybackStatus('error');
        setPlaybackError('This song is unavailable.');
        return;
      }

      audio.src = song.audioUrl;
      setPlaybackState((prev) => ({
        ...prev,
        currentSongId: song.id,
        currentTime: 0,
        isPlaying: true,
      }));
      setPlaybackStatus('playing');
      setPlaybackError(null);
    },
    []
  );

  const handlePlay = useCallback((): void => {
    if (!currentSong) {
      if (playbackState.queue.length > 0) {
        handleSongSelect(playbackState.queue[0]);
      }
      return;
    }

    setPlaybackState((prev) => ({ ...prev, isPlaying: true }));
    setPlaybackStatus('playing');
    setPlaybackError(null);
  }, [currentSong, playbackState.queue, handleSongSelect]);

  const handlePause = useCallback((): void => {
    setPlaybackState((prev) => ({ ...prev, isPlaying: false }));
    setPlaybackStatus('paused');
  }, []);

  const handleSkipNext = useCallback((): void => {
    const nextIndex = playbackState.queueIndex + 1;
    if (nextIndex < playbackState.queue.length) {
      const nextSong = playbackState.queue[nextIndex];
      setPlaybackState((prev) => ({
        ...prev,
        queueIndex: nextIndex,
      }));
      handleSongSelect(nextSong);
    } else {
      setPlaybackState((prev) => ({ ...prev, isPlaying: false, currentSongId: undefined }));
      setPlaybackStatus('idle');
    }
  }, [playbackState.queue, playbackState.queueIndex, handleSongSelect]);

  const handleSkipPrevious = useCallback((): void => {
    if (playbackState.queueIndex > 0) {
      const prevIndex = playbackState.queueIndex - 1;
      const prevSong = playbackState.queue[prevIndex];
      setPlaybackState((prev) => ({
        ...prev,
        queueIndex: prevIndex,
      }));
      handleSongSelect(prevSong);
    } else if (playbackState.currentSongId) {
      setPlaybackState((prev) => ({ ...prev, currentTime: 0 }));
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    }
  }, [playbackState.queue, playbackState.queueIndex, playbackState.currentSongId, handleSongSelect]);

  const handleVolumeChange = useCallback((value: number): void => {
    setPlaybackState((prev) => ({ ...prev, volume: value }));
  }, []);

  const handleErrorBoundaryError = useCallback((): void => {
    setPlaybackStatus('error');
    setPlaybackError('An unexpected error occurred.');
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent): void => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (playbackState.isPlaying) {
          handlePause();
        } else {
          handlePlay();
        }
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleSkipNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handleSkipPrevious();
      }
    },
    [playbackState.isPlaying, handlePlay, handlePause, handleSkipNext, handleSkipPrevious]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <ErrorBoundary onError={handleErrorBoundaryError}>
      <audio ref={audioRef} />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 sm:p-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-8 text-center text-4xl font-bold text-white">Music Player</h1>

          {error && (
            <div className="mb-6 rounded-lg bg-red-500/10 p-4 text-red-400" role="alert">
              Error: {error}
            </div>
          )}

          <div className="space-y-6">
            {loading ? (
              <LoadingState />
            ) : songs.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                <Player
                  currentSong={currentSong}
                  isPlaying={playbackState.isPlaying}
                  status={playbackStatus}
                  errorMessage={playbackError || undefined}
                />

                <PlaybackProgress
                  currentTime={playbackState.currentTime}
                  duration={currentSong?.duration ?? 0}
                />

                <PlaybackControls
                  onPlay={handlePlay}
                  onPause={handlePause}
                  onSkipNext={handleSkipNext}
                  onSkipPrevious={handleSkipPrevious}
                  isPlaying={playbackState.isPlaying}
                  canSkipNext={playbackState.queueIndex < playbackState.queue.length - 1}
                  canSkipPrevious={playbackState.queueIndex > 0}
                />

                <VolumeSlider
                  volume={playbackState.volume}
                  onChange={handleVolumeChange}
                />
              </>
            )}

            <SongList
              songs={songs}
              onSelect={handleSongSelect}
              currentSongId={playbackState.currentSongId}
              isLoading={loading}
            />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}