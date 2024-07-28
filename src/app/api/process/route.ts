
import { NextApiRequest, NextApiResponse } from 'next';
import { Octokit } from '@octokit/core';
import OpenAI from "openai";

// import utils here to make it easier

const openai = new OpenAI();
const octokit = new Octokit({
  auth: process.env.GITHUB_API_KEY
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
  content?: string;
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
  const { repoOwner, repoName, repoPath } = req.body;


  try {
    let mdFilesContent: GitHubFileContent[]= [];

    if (repoPath.endsWith('.md')) {
      const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: repoOwner,
        repo: repoName,
        path: repoPath,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });

      const fileData = response.data as GitHubFile;
      if (fileData.content !== undefined) {
        const content = Buffer.from(fileData.content, 'base64').toString('utf-8');
        mdFilesContent.push({
          path: fileData.path,
          content,
        });
      }

    } else {
      const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: repoOwner,
        repo: repoName,
        path: repoPath,
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
      mdFilesContent = await Promise.all(mdFilesContentPromises);
    }
    
    const contentString = await processData(mdFilesContent);
    const gptResponse = await gptCall(contentString);
  
    res.status(200).json(gptResponse);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }

}

async function gptCall(data: string): Promise<any> {
  // Perform your data processing here
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: data }],
      model: "gpt-3.5-turbo",
    });

    return completion;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

async function processData(data: GitHubFileContent[]): Promise<string> {
  // Perform your data processing here
  try {
    let combinedContent = "This is a raw .md file. Please provide an easy-to-read list of ALL the code snippets along with a summary of what each does. The summary should be based on both the description from the documentation and the code itself. Format the output in markdown as follows: \n" +
     "Function Name: <function_name> \n" + "Description: <description> \n" + 
     "Summary: <summary_of_what_the_code_does> \n" + "Example: \n" + "Function Name: exampleFunction \n" + 
     "Description: This function demonstrates an example. \n" + "Code: " + "function exampleFunction() { \n" +
     "console.log(\"This is an example.\"); \n" + "} \n" + "Summary: This function logs the string \"This is an example.\" to the console. \n" + 
     "Process each function in the .md file similarly.";    
     
     const delimiter = "\n\n---\n\n";

    data.forEach(item => {
      combinedContent += item.content + delimiter;
    });

    combinedContent = combinedContent.slice(0, -delimiter.length);

    return combinedContent;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
