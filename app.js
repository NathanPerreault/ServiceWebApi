import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import livreRouter from './routes/livre.route.js';
import auteurRouter from './routes/auteurs.route.js';
import utilisateurRouter from './routes/utilisateur.route.js';

import { errorHandler } from './middelwares/errorHandler.js';

import { sequelize } from './config/config.js';

import { config } from 'dotenv';

config();



const app = express();
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());




app.use('/api/livre', livreRouter);
app.use('/api/auteur', auteurRouter);
app.use('/api/utilisateur',utilisateurRouter);


app.use(errorHandler);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
});
