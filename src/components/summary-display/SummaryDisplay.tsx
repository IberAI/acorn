
import React from 'react';

interface SummaryDisplayProps {
  summary: string;
}

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ summary }) => {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900">Summary</h2>
      <div className="mt-2 p-4 rounded-md border border-gray-300 bg-gray-50 h-80"> {/* Adjust height as needed */}
        <div className="summary-display h-full overflow-y-auto" dangerouslySetInnerHTML={{ __html: summary }} />
      </div>
    </div>
  );
};

export default SummaryDisplay;

