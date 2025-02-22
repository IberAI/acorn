
import { NextRequest, NextResponse } from 'next/server';
import { Octokit } from '@octokit/core';
import OpenAI from 'openai';

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

export async function POST(req: NextRequest) {
  const { isFile, repoOwner, repoName, repoPath, content } = await req.json();
  try {
    let response: string;
    if (isFile) {
      response = await fileProcess(content);
    } else {
      response = await linkProcess(repoOwner, repoName, repoPath);
    }
  
      
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }

async function linkProcess(repoOwner: string, repoName: string, repoPath: string): Promise<any> {
  try {
    let mdFilesContent: GitHubFileContent[] = [];

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
    
    const contentString = await processLinkData(mdFilesContent);
    const gptResponse = await gptCall(contentString);
    return gptResponse
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

async function fileProcess(data: string): Promise<any> {
  try {
    const prompt = await processFileData(data);
    const gptResponse = await gptCall(prompt);
    return gptResponse
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

async function gptCall(data: string): Promise<any> {
  // Perform your data processing here
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: data }],
      model: 'gpt-3.5-turbo',
    });

    return completion;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

async function processLinkData(data: GitHubFileContent[]): Promise<string> {
  // Perform your data processing here
  try {
    let combinedContent = "This is a raw .md file. Please provide an easy-to-read list of ALL the code snippets along with a summary of what each does. The summary should be based on both the description from the documentation and the code itself. Format the output in markdown as follows: \n" +
    "Function Name: <function_name> \n" + "Description: <description> \n" + 
    "Summary: <summary_of_what_the_code_does> \n"  + 
    "Process each function in the .md file similarly.";   ;    
     
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

  async function processFileData(data: string): Promise<string> {
    // Perform your data processing here
    try {
      let combinedContent = "This is a raw .md file. Please provide an easy-to-read list of ALL the code snippets along with a summary of what each does. The summary should be based on both the description from the documentation and the code itself. Format the output in markdown as follows: \n" +
       "Function Name: <function_name> \n" + "Description: <description> \n" + 
       "Summary: <summary_of_what_the_code_does> \n"  + 
       "Process each function in the .md file similarly.";   ;    
  
      combinedContent += data;
    
      return combinedContent;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
