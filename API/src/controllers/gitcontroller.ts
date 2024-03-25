import { Request, Response } from 'express';
import * as path from 'path';
import { GitHubRepo } from '../services/gitservice';

// export const getUser = (req: Request, res: Response) => {
//     // Logic to fetch user data
//     res.send('Get User Endpoint');
// };

// export const postUser = (req: Request, res: Response) => {
//     // Logic to create a new user
//     res.send('Post User Endpoint');
// };

export const getContributors = ((req: Request, res: Response) => {
    const currentDir = __dirname;
    const projectRoot = path.resolve(currentDir, '../..');
    console.log(`Hello, this is your current directory: ${projectRoot}`);
  
    const githubRepo = new GitHubRepo();
    githubRepo.fetchContributors('KeeanMitchell', 'GitHubClient')
        .then((contributors: string[]) => {
            console.log('Contributors:', contributors);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    res.send();
  });