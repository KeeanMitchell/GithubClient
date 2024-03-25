export interface GitHubRepoInterface {
    fetchContributors(owner: string, repo: string): Promise<string[]>;
}