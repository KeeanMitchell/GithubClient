"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Commit = void 0;
class Commit {
    constructor(sha, commit, html_url, metadata) {
        this.sha = sha;
        this.commit = commit;
        this.html_url = html_url;
        this.metadata = metadata;
    }
}
exports.Commit = Commit;
