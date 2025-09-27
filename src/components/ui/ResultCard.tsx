
import React from 'react';

interface ResultCardProps {
  content: string | null;
  error?: string | null;
  className?: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ content, error, className = '' }) => {
  if (!content && !error) {
    return null;
  }

  const resultToShow = error ? `Error: ${error}` : content;

  return (
    <div className={`mt-6 bg-gray-900/80 border border-gray-700 rounded-lg p-4 text-sm sm:text-base ${error ? 'border-red-500/50' : 'border-gray-700'} ${className}`}>
      <pre className="whitespace-pre-wrap break-words font-mono text-gray-300">
        {resultToShow}
      </pre>
    </div>
  );
};

export default ResultCard;
