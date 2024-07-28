"use client"
import { useState, ChangeEvent } from 'react';
import { Article } from '@/components/article';
import {GithubLinkInput} from '@/components/github-link-input';
import {FileUpload} from '@/components/file-upload';
import {SummaryDisplay} from '@/components/summary-display';

const ContactPage: React.FC = () => {
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

  return (
    <Article
      title="Contact"
      imageAlt="Lorem Picsum"
      imageSrc="https://picsum.photos/420/640?grayscale"
    >
      <div className="space-y-4">
        <GithubLinkInput githubLink={githubLink} onChange={handleGithubLinkChange} />
        <FileUpload fileName={fileName} onChange={handleFileChange} />
        <SummaryDisplay summary={summary} />
      </div>
    </Article>
  );
};

export default ContactPage;

