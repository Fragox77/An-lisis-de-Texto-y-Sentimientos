
import React from 'react';

const Loading: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="mt-6 flex items-center justify-center gap-3 text-purple-300">
      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
      <span className="font-semibold">{text}</span>
    </div>
  );
};

export default Loading;
