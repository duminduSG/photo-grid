import { Router } from 'express';
import getImages from '../controllers/images.controller';

const router = Router();

router.get('/', (req, res) => getImages(req, res));

export default router;
