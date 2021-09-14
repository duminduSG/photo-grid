import { Router } from 'express';
import saveGrid from '../controllers/grid.controller';

const router = Router();

router.get('/', (req, res) => res.json({ res: 'grid' }));

router.post('/', async (req, res) => {
  const grid = await saveGrid(req, res);
  return res.json(grid);
});

export default router;
