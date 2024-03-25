"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitController = void 0;
class GitController {
    constructor(supabaseService, githubService) {
        this.getContributors = ((req, res) => {
            this._githubService.fetchContributors(req.body.owner, req.body.repo)
                .then((contributors) => {
                console.log('Contributors:', contributors);
                res.send(contributors);
            })
                .catch((error) => {
                console.error('Error:', error);
                res.send(error);
            });
        });
        this.getCommitsForContributor = ((req, res) => {
            this._githubService.fetchCommitsByUser(req.body.owner, req.body.repo, req.body.user)
                .then((commits) => {
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
        this.getReposForOwner = ((req, res) => __awaiter(this, void 0, void 0, function* () {
            this._githubService.getRepositories(req.body.owner)
                .then((repos) => {
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
        }));
        this.saveSupabase = ((req, res) => {
            this._supabaseService.saveFavouriteCommits()
                .then(() => {
                console.log("yay");
            })
                .catch((error) => {
                console.error('Error:', error);
            });
            res.send();
        });
        this.updateSupabase = ((req, res) => {
            this._supabaseService.updateFavouriteCommits(req.body.favourites, req.body.user)
                .then(() => {
                console.log("yay");
            })
                .catch((error) => {
                console.error('Error:', error);
            });
            res.send();
        });
        this.fetchSupabase = ((req, res) => {
            this._supabaseService.getFavouriteCommits(req.body.user)
                .then((shas) => {
                res.send(shas);
                console.log("yay");
            })
                .catch((error) => {
                console.error('Error:', error);
                res.send(error);
            });
        });
        this._supabaseService = supabaseService;
        this._githubService = githubService;
    }
}
exports.GitController = GitController;
