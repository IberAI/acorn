
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

  const handleSubmission = async () => {
    const repoDetails = githubLink.split('/').slice(-2);
    const repoOwner = repoDetails[0];
    const repoName = repoDetails[1];
    const repoPath = ''; // Adjust if you have a specific path in mind

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
    }
  };

  return (
    <Article
      title="Contact"
      imageAlt="Lorem Picsum"
      imageSrc="https://picsum.photos/420/640?grayscale"
    >
      <div className="space-y-4">
        <GithubLinkInput githubLink={githubLink} onChange={handleGithubLinkChange} />
        <FileUpload fileName={fileName} onChange={handleFileChange} />
        <button className="mt-1 block w-full text-sm text-gray-500 mr-4 py-2 px-4 rounded-md border-0 text-sm font-semibold bg-primary-400 text-white hover:bg-primary-500" onClick={handleSubmission}>
          Submit
        </button>
        <SummaryDisplay summary={summary} />
      </div>
    </Article>
  );
};

export default LiveDemoPage;


