import { Router } from 'express';
import {
getAllLivres,
createLivre,
deleteLivre,
updateLivre,

} from '../controllers/livres.controller.js';

import { validateLivres } from '../validation/validations.js';

import { authenticateToken } from '../middelwares/authenticateToken.js';

const router = Router();

router.get('/', getAllLivres);
router.post('/',validateLivres,authenticateToken, createLivre);
router.put('/:id',validateLivres,authenticateToken, updateLivre);
router.delete('/:id',authenticateToken, deleteLivre);

export default router;