
import { NextApiRequest, NextApiResponse } from 'next';
import { Octokit } from '@octokit/core';

// import utils here to make it easier
const octokit = new Octokit({
  auth: 'process.env.GITHUB_API_KEY'
});

type GitHubFile = {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  _links: {
    self: string;
    git: string;
    html: string;
  };
};

type GitHubFileContent = {
  path: string;
  content: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // External service request
  // prase the request and get the repoOwner and repoName
  const repoOwner = ''; // replace with the repo owner's username
  const repoName = ''; // replace with the repository name


  const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: repoOwner,
    repo: repoName,
    path: '',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });


    const mdFiles = (response.data as GitHubFile[]).filter(file => file.name.endsWith('.md'));

    const mdFilesContentPromises = mdFiles.map(async (file) => {
      const fileResponse = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: repoOwner,
        repo: repoName,
        path: file.path,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });

      const fileData = fileResponse.data as GitHubFile & { content: string };
      const content = Buffer.from(fileData.content, 'base64').toString('utf-8');

      return {
        path: file.path,
        content,
      };
    });

    const mdFilesContent: GitHubFileContent[] = await Promise.all(mdFilesContentPromises);

  // Process the data as needed
  const processedData = processData(mdFilesContent);

  res.status(200).json(processedData);
}

function processData(data: any) {
  // Perform your data processing here
  return data; // Modify this as needed
}

