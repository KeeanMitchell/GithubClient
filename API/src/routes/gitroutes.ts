import express from 'express';
import { GitController } from '../controllers/gitcontroller';
import { SupabaseRepo } from '../services/supabaseservice';
import { GitHubRepo } from '../services/gitservice';

const router = express.Router();

const supabaseService = new SupabaseRepo("https://cesujyywaqzlfptaexif.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlc3VqeXl3YXF6bGZwdGFleGlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEzNTQ0NTcsImV4cCI6MjAyNjkzMDQ1N30.nrjom8cM-APw5moM6aUKKALqdCOEToNoNyt_7iA1hAo");
const githubService = new  GitHubRepo();
const gitController = new GitController(supabaseService, githubService);

router.get('/contributors', gitController.getContributors);
router.post('/contributor/commits', gitController.getCommitsForContributor);
router.post('/repos', gitController.getReposForOwner);
router.post('/test/save/supabase', gitController.saveSupabase);
router.post('/test/update/supabase', gitController.updateSupabase);
router.post('/test/fetch/supabase', gitController.fetchSupabase);

export default router;