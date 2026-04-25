export default function LoadingState(): React.ReactElement {
  return (
    <div className="rounded-lg bg-slate-800 p-8 text-center shadow-lg">
      <div className="mb-4 inline-block">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-600 border-t-blue-600" />
      </div>
      <p className="text-slate-300">Loading your songs...</p>
    </div>
  );
}