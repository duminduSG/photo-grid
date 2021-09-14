import { Router } from 'express';
import getImages from '../controllers/images.controller';

const router = Router();

router.get('/', async (req, res) => {
  const images = await getImages();
  return res.json(images);
});

export default router;
