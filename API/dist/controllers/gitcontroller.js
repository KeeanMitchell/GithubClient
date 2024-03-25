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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContributors = void 0;
const path = __importStar(require("path"));
const gitservice_1 = require("../services/gitservice");
// export const getUser = (req: Request, res: Response) => {
//     // Logic to fetch user data
//     res.send('Get User Endpoint');
// };
// export const postUser = (req: Request, res: Response) => {
//     // Logic to create a new user
//     res.send('Post User Endpoint');
// };
exports.getContributors = ((req, res) => {
    const currentDir = __dirname;
    const projectRoot = path.resolve(currentDir, '../..');
    console.log(`Hello, this is your current directory: ${projectRoot}`);
    const githubRepo = new gitservice_1.GitHubRepo();
    githubRepo.fetchContributors('KeeanMitchell', 'GitHubClient')
        .then((contributors) => {
        console.log('Contributors:', contributors);
    })
        .catch((error) => {
        console.error('Error:', error);
    });
    res.send();
});
