import { Router } from 'express';
import {
getAllAuteurs,
createAuteur,
deleteAuteur,
updateAuteur,

} from '../controllers/auteurs.controller.js';

import { authenticateToken } from '../middelwares/authenticateToken.js';

const router = Router();

router.get('/', getAllAuteurs);
router.post('/',authenticateToken, createAuteur);
router.put('/:id',authenticateToken, updateAuteur);
router.delete('/:id',authenticateToken, deleteAuteur);

export default router;