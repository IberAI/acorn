
"use client";
import { useState, ChangeEvent } from 'react';
import { GithubLinkInput } from '@/components/github-link-input';
import { FileUpload } from '@/components/file-upload';
import {SummaryDisplay} from '@/components/summary-display';

const LiveDemoPage: React.FC = () => {
  const [githubLink, setGithubLink] = useState('');
  const [fileName, setFileName] = useState('');
  const [summary, setSummary] = useState('Your summarized README will appear here.');
  const [isLoading, setIsLoading] = useState(false);

  const handleGithubLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGithubLink(e.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSubmission = async () => {
    setIsLoading(true);
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
      setSummary(data.choices[0].message.content);
    } catch (error) {
      setSummary('An error occurred while fetching the summary.');
    } finally {
      setIsLoading(false);
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
      
      <button 
        className="ml-40 mt-1 block w-[50%] text-sm text-gray-500 mr-4 py-2 px-4 rounded-md border-0 text-sm font-semibold bg-primary-400 text-white hover:bg-primary-500" 
        onClick={handleSubmission}
        disabled={isLoading}
      >
        {isLoading ? (
          <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          'Submit'
        )}
      </button>
      
      <SummaryDisplay summary={summary} />
    </div>
  );
};

export default LiveDemoPage;

