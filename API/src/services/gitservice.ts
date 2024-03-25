import axios from 'axios';
import { GitHubRepoInterface } from '../interfaces/Igitservice';

export class GitHubRepo implements GitHubRepoInterface {
    async fetchContributors(owner: string, repo: string): Promise<string[]> {
        try {
            const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contributors`);
            // Extract contributor logins
            const contributors: string[] = response.data.map((contributor: any) => contributor.login);
            return contributors;
        } catch (error: any) {
            console.error('Error fetching contributors:', error.message);
            return [];
        }
    }
}