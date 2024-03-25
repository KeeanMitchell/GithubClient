import express from 'express';
import { GitController } from '../controllers/gitcontroller';
import { SupabaseRepo } from '../services/supabaseservice';
import { GitHubRepo } from '../services/gitservice';
import dotenv from 'dotenv'; 

const router = express.Router();

dotenv.config();

const key:string = process.env.SUPABASE_KEY ?? '';
const url:string = process.env.SUPABASE_URL ?? '';

const supabaseService = new SupabaseRepo(url, key);
const githubService = new  GitHubRepo();
const gitController = new GitController(supabaseService, githubService);

router.post('/contributors', gitController.getContributors);
router.post('/contributor/commits', gitController.getCommitsForContributor);
router.post('/repos', gitController.getReposForOwner);
router.post('/test/save/supabase', gitController.saveSupabase);
router.post('/test/update/supabase', gitController.updateSupabase);
router.post('/test/fetch/supabase', gitController.fetchSupabase);

export default router;