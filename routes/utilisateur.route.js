import { Router } from 'express';
import cors from 'cors';
import {
loginUtilisateur,
updateUtilisateur
,
registerUtilisateur

} from '../controllers/utilisateurs.controller.js';

import { authenticateToken } from '../middelwares/authenticateToken.js';
import { authorize } from '../middelwares/authorize.js';

import { validateUtilisateurs } from '../validation/validations.js';

const router = Router();
router.use(cors());

router.post('/login',validateUtilisateurs,loginUtilisateur);
router.post('/signup',validateUtilisateurs, registerUtilisateur);
router.put('/update/:id',validateUtilisateurs, authenticateToken, authorize(['admin']), updateUtilisateur);


export default router;