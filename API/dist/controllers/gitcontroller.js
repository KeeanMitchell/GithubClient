"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitController = void 0;
const path = __importStar(require("path"));
const gitservice_1 = require("../services/gitservice");
const supabaseservice_1 = require("../services/supabaseservice");
const inversify_1 = require("inversify");
require("reflect-metadata");
let GitController = class GitController {
    constructor(supabaseService, githubService) {
        this.getContributors = ((req, res) => {
            const currentDir = __dirname;
            const projectRoot = path.resolve(currentDir, '../..');
            console.log(`Hello, this is your current directory: ${projectRoot}`);
            this._githubService.fetchContributors('KeeanMitchell', 'GitHubClient')
                .then((contributors) => {
                console.log('Contributors:', contributors);
            })
                .catch((error) => {
                console.error('Error:', error);
            });
            res.send();
        });
        this.getCommitsForContributor = ((req, res) => {
            this._githubService.fetchCommitsByUser(req.body.owner, req.body.repo, req.body.user)
                .then((commits) => {
                commits.forEach(commit => {
                    console.log('Commits:', JSON.stringify(commit));
                });
            })
                .catch((error) => {
                console.error('Error:', error);
            });
            res.send();
        });
        this.getReposForOwner = ((req, res) => {
            this._githubService.getRepositories(req.body.owner)
                .then((repos) => {
                repos.forEach(repo => {
                    console.log('repo: ', repo);
                });
            })
                .catch((error) => {
                console.error('Error:', error);
            });
            res.send();
        });
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
            this._supabaseService.updateFavouriteCommits()
                .then(() => {
                console.log("yay");
            })
                .catch((error) => {
                console.error('Error:', error);
            });
            res.send();
        });
        this.fetchSupabase = ((req, res) => {
            this._supabaseService.getFavouriteCommits()
                .then(() => {
                console.log("yay");
            })
                .catch((error) => {
                console.error('Error:', error);
            });
            res.send();
        });
        this._supabaseService = supabaseService;
        this._githubService = githubService;
    }
};
exports.GitController = GitController;
exports.GitController = GitController = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [supabaseservice_1.SupabaseRepo,
        gitservice_1.GitHubRepo])
], GitController);
