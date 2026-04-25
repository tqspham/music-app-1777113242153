'use client';

interface VolumeSliderProps {
  volume: number;
  onChange: (value: number) => void;
}

export default function VolumeSlider({
  volume,
  onChange,
}: VolumeSliderProps): React.ReactElement {
  return (
    <div className="rounded-lg bg-slate-800 p-6 shadow-lg">
      <label htmlFor="volume-slider" className="mb-3 block text-sm font-medium text-white">
        Volume: {volume}%
      </label>
      <input
        id="volume-slider"
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full cursor-pointer accent-blue-600"
        aria-label="Volume control"
      />
    </div>
  );
}