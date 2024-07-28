
"use client"
import { useState, ChangeEvent } from 'react';
import { Article } from '@/components/article';
import { GithubLinkInput } from '@/components/github-link-input';
import { FileUpload } from '@/components/file-upload';
import { SummaryDisplay } from '@/components/summary-display';

const LiveDemoPage: React.FC = () => {
  const [githubLink, setGithubLink] = useState('');
  const [fileName, setFileName] = useState('');
  const [summary, setSummary] = useState('Your summarized README will appear here.');
  

  const handleGithubLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGithubLink(e.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const formatSummary = (summary: string): string => {
    return summary.split(/- Function Name:/g)
      .filter(section => section.trim() !== '')
      .map(section => {
        const [functionNamePart, descriptionPart, summaryTextPart] = section.split(/Description:|Summary:/).map(str => str.trim());
        return `
          <div>
            <p><strong>Function Name:</strong> ${functionNamePart}</p>
            <p><strong>Description:</strong> ${descriptionPart}</p>
            <p><strong>Summary:</strong> ${summaryTextPart}</p>
          </div>
          <hr>
        `;
      }).join('');
  };

  const handleSubmission = async () => {
    const repoDetails = githubLink.split('/').slice(3);
    const repoOwner = repoDetails[0];
    const repoName = repoDetails[1];
    
    // Check if the URL contains 'blob' or 'tree' and adjust the route accordingly
    let repoPath = '';
    if (repoDetails[2] === 'blob' || repoDetails[2] === 'tree') {
      repoPath = repoDetails.slice(4).join('/');
    } else {
      repoPath = repoDetails.slice(2).join('/');
    }

    try {
      const response = await fetch('/api/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ repoOwner, repoName, repoPath }),
      });

      const data = await response.json();
      const formattedSummary = formatSummary(data.choices[0].message.content);
      setSummary(formattedSummary);
    } catch (error) {
      setSummary('An error occurred while fetching the summary.');
    }
  };

  return (
    <div className="space-y-6 ml-40 w-[40%]">
      <GithubLinkInput githubLink={githubLink} onChange={handleGithubLinkChange} />
      
      <div className="flex justify-center">
        <p className="text-primary font-bold"> OR </p>
      </div>
      
      <div className="flex justify-center">
        <FileUpload fileName={fileName} onChange={handleFileChange} />
      </div>
      
      <button className="ml-40 mt-1 block w-[50%] text-sm text-gray-500 mr-4 py-2 px-4 rounded-md border-0 text-sm font-semibold bg-primary-400 text-white hover:bg-primary-500" onClick={handleSubmission}>
        Submit
      </button>
      
      <SummaryDisplay summary={summary} />
    </div>
  );
} 

export default LiveDemoPage;


