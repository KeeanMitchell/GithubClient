import { Request, Response } from 'express';
import * as path from 'path';
import { GitHubRepo } from '../services/gitservice';
import { Commit } from '../models/commit';
import { SupabaseRepo } from '../services/supabaseservice';

export class GitController{
    private readonly _supabaseService: SupabaseRepo;
    private readonly _githubService: GitHubRepo;

    constructor(
        supabaseService: SupabaseRepo,
        githubService: GitHubRepo
    ){
        this._supabaseService = supabaseService;
        this._githubService = githubService;
    }

    public getContributors = ((req: Request, res: Response) => {
        this._githubService.fetchContributors(req.body.owner, req.body.repo)
            .then((contributors: string[]) => {
                console.log('Contributors:', contributors);
                res.send(contributors);
            })
            .catch((error) => {
                console.error('Error:', error);
                res.send(error);
            });
    });
    
    public getCommitsForContributor = ((req: Request, res: Response) => {

        this._githubService.fetchCommitsByUser(req.body.owner, req.body.repo, req.body.user)
            .then((commits: Commit[]) => {
                commits.forEach(commit => {               
                    console.log('Commits:', JSON.stringify(commit));
                });
                res.send(commits);
            })
            .catch((error) => {
                console.error('Error:', error);
                res.send(error);
            });
    });
    
    public getReposForOwner = (async (req: Request, res: Response) => {
        this._githubService.getRepositories(req.body.owner)
            .then((repos: string[]) => {
                repos.forEach(repo => {               
                    console.log('repo: ', repo);
                });
                res.send(repos);
            })
            .catch((error) => {
                console.error('Error:', error);
                res.send(error);
            });
        //res.send();
    });
    
    public saveSupabase = ((req: Request, res: Response) => {  
        this._supabaseService.saveFavouriteCommits()
            .then(() =>{
                console.log("yay");
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        res.send();
    });
    
    public updateSupabase = ((req: Request, res: Response) => {
        this._supabaseService.updateFavouriteCommits(req.body.favourites, req.body.user)
            .then(() =>{
                console.log("yay");
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        res.send();
    });
    
    public fetchSupabase = ((req: Request, res: Response) => {
        this._supabaseService.getFavouriteCommits(req.body.user)
            .then((shas:string[]) =>{
                res.send(shas);
                console.log("yay");
            })
            .catch((error) => {
                console.error('Error:', error);
                res.send(error);
            });
    });

}
