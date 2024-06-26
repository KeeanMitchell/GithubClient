import { ICommitData } from "../interfaces/models/Icommitdata";
import { IMetadata } from "../interfaces/models/Imetadata";

export class Commit {
    sha: string;
    commit: ICommitData;
    html_url: string;

    constructor(sha: string, commit: ICommitData, html_url: string) {
        this.sha = sha;
        this.commit = commit;
        this.html_url = html_url;
    }
}