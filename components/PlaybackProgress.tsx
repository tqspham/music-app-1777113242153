interface PlaybackProgressProps {
  currentTime: number;
  duration: number;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function PlaybackProgress({
  currentTime,
  duration,
}: PlaybackProgressProps): React.ReactElement {
  const percentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="rounded-lg bg-slate-800 p-6 shadow-lg">
      <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-700">
        <div
          className="h-full bg-blue-600 transition-all"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={Math.round(percentage)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Playback progress: ${formatTime(currentTime)} of ${formatTime(duration)}`}
        />
      </div>
    </div>
  );
}