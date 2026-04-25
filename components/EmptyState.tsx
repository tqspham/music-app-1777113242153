import { Music } from 'lucide-react';

export default function EmptyState(): React.ReactElement {
  return (
    <div className="rounded-lg bg-slate-800 p-8 text-center shadow-lg">
      <Music className="mx-auto mb-4 text-slate-500" size={48} />
      <p className="text-slate-400">No songs available. Please try again later.</p>
    </div>
  );
}