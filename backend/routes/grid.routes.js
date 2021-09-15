import { Router } from 'express';
import saveGrid from '../controllers/grid.controller';

const router = Router();

router.post('/', async (req, res) => saveGrid(req, res));

export default router;
