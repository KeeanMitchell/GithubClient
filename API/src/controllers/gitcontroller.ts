import { Request, Response } from 'express';
import * as path from 'path';
import { GitHubRepo } from '../services/gitservice';
import { Commit } from '../models/commit';
import { SupabaseRepo } from '../services/supabaseservice';
import { ISupabaseRepo } from '../interfaces/Isupabaseservice';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
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
        const currentDir = __dirname;
        const projectRoot = path.resolve(currentDir, '../..');
        console.log(`Hello, this is your current directory: ${projectRoot}`);

        this._githubService.fetchContributors('KeeanMitchell', 'GitHubClient')
            .then((contributors: string[]) => {
                console.log('Contributors:', contributors);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        res.send();
    });
    
    public getCommitsForContributor = ((req: Request, res: Response) => {

        this._githubService.fetchCommitsByUser(req.body.owner, req.body.repo, req.body.user)
            .then((commits: Commit[]) => {
                commits.forEach(commit => {               
                    console.log('Commits:', JSON.stringify(commit));
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        res.send();
    });
    
    public getReposForOwner = ((req: Request, res: Response) => {
        this._githubService.getRepositories(req.body.owner)
            .then((repos: string[]) => {
                repos.forEach(repo => {               
                    console.log('repo: ', repo);
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        res.send();
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
        this._supabaseService.updateFavouriteCommits()
            .then(() =>{
                console.log("yay");
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        res.send();
    });
    
    public fetchSupabase = ((req: Request, res: Response) => {
        this._supabaseService.getFavouriteCommits()
            .then(() =>{
                console.log("yay");
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        res.send();
    });

}
