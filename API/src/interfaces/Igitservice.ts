import { Commit } from "../models/commit";

export interface GitHubRepoInterface {
    fetchContributors(owner: string, repo: string): Promise<string[]>;
    fetchCommitsByUser(owner: string, repo: string, username: string): Promise<Commit[]> ;
}