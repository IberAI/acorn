
import React, { ChangeEvent } from 'react';

interface GithubLinkInputProps {
  githubLink: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const GithubLinkInput: React.FC<GithubLinkInputProps> = ({ githubLink, onChange }) => {
  return (
    <div>
      <label htmlFor="githubLink" className="block text-sm font-medium text-gray-700">
        GitHub Link
      </label>
      <input
        type="text"
        id="githubLink"
        name="githubLink"
        value={githubLink}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
        placeholder="Enter your GitHub repository link"
      />
    </div>
  );
};

export default GithubLinkInput;
