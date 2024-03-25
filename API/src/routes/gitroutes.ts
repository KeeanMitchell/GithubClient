import express from 'express';
import { getContributors } from '../controllers/gitcontroller';

const router = express.Router();

router.get('/contributors', getContributors);

export default router;