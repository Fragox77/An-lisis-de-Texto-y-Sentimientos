
import React from 'react';

interface DemoCardProps {
  title: string;
  description: React.ReactNode;
  children: React.ReactNode;
}

const DemoCard: React.FC<DemoCardProps> = ({ title, description, children }) => {
  return (
    <div className="bg-gray-900/50 p-6 sm:p-8 rounded-xl border border-gray-700 animate-fadeIn">
      <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
        {title}
      </h2>
      <div className="mt-3 text-gray-400 prose prose-invert prose-sm max-w-none">
        {description}
      </div>
      <div className="mt-6">
        {children}
      </div>
    </div>
  );
};

export default DemoCard;
