import axios from 'axios';
import { GitHubRepoInterface } from '../interfaces/Igitservice';
import { Commit } from '../models/commit';

export class GitHubRepo implements GitHubRepoInterface {
    async fetchContributors(owner: string, repo: string): Promise<string[]> {
        try {
            console.log(owner+ ' '+repo);
            const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contributors`);
            // Extract contributor logins
            const contributors: string[] = response.data.map((contributor: any) => contributor.login);
            return contributors;
        } catch (error: any) {
            console.error('Error fetching contributors:', error.message);
            return [];
        }
    }

    async fetchCommitsByUser(owner: string, repo: string, username: string): Promise<Commit[]> {
        try {
            const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`, {
                params: {
                    author: username
                }
            });
            const commits: Commit[] = response.data.map((commit: Commit) => {
                return commit;
            });
            return commits;
        } catch (error: any) {
            console.error('Error fetching commits:', error.message);
            return [];
        }
    }

    async getRepositories(owner: string): Promise<string[]> {
        try {
            const response = await axios.get(`https://api.github.com/users/${owner}/repos`);
            return response.data.map((repo: any) => repo.name);
        } catch (error) {
            throw new Error(`Error fetching repositories: ${error}`);
        }
    }
}