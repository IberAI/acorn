
"use client";
import React from 'react';

interface SummarySection {
  functionName: string;
  description: string;
  summaryText: string;
}

interface SummaryDisplayProps {
  summary: string;
}

const parseSummary = (summary: string): SummarySection[] => {
  return summary
    .split(/- Function Name:/g)
    .filter(section => section.trim() !== '')
    .map(section => {
      const [functionNamePart, descriptionPart, summaryTextPart] = section
        .split(/Description:|Summary:/)
        .map(str => str.trim());
      return {
        functionName: functionNamePart,
        description: descriptionPart,
        summaryText: summaryTextPart,
      };
    });
};

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ summary }) => {
  const sections = parseSummary(summary);

  return (
    <div className="mt-2 p-4 rounded-md border border-gray-300 bg-gray-50 h-80 overflow-y-auto">
      {sections.map((section, index) => (
        <div key={index} className="summary-section mb-4 overflow-auto">
          <p><strong>Function Name:</strong> {section.functionName}</p>
          <p><strong>Description:</strong> {section.description}</p>
          <p><strong>Summary:</strong> {section.summaryText}</p>
          {index < sections.length - 1 && <hr />}
        </div>
      ))}
    </div>
  );
};

export default SummaryDisplay;

