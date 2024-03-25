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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubRepo = void 0;
const axios_1 = __importDefault(require("axios"));
class GitHubRepo {
    fetchContributors(owner, repo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(owner + ' ' + repo);
                const response = yield axios_1.default.get(`https://api.github.com/repos/${owner}/${repo}/contributors`);
                // Extract contributor logins
                const contributors = response.data.map((contributor) => contributor.login);
                return contributors;
            }
            catch (error) {
                console.error('Error fetching contributors:', error.message);
                return [];
            }
        });
    }
    fetchCommitsByUser(owner, repo, username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`https://api.github.com/repos/${owner}/${repo}/commits`, {
                    params: {
                        author: username
                    }
                });
                const commits = response.data.map((commit) => {
                    return commit;
                });
                return commits;
            }
            catch (error) {
                console.error('Error fetching commits:', error.message);
                return [];
            }
        });
    }
    getRepositories(owner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`https://api.github.com/users/${owner}/repos`);
                return response.data.map((repo) => repo.name);
            }
            catch (error) {
                throw new Error(`Error fetching repositories: ${error}`);
            }
        });
    }
}
exports.GitHubRepo = GitHubRepo;
