'use client';

import { ReactNode } from 'react';
import { useState, useEffect } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  onError: (error: Error) => void;
}

export default function ErrorBoundary({
  children,
  onError,
}: ErrorBoundaryProps): React.ReactElement {
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const handleError = (event: ErrorEvent): void => {
      setHasError(true);
      onError(event.error);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, [onError]);

  if (hasError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 sm:p-8">
        <div className="mx-auto max-w-2xl rounded-lg bg-red-500/10 p-6 text-center">
          <p className="text-red-400">
            An error occurred while rendering the player. Please refresh the page.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}