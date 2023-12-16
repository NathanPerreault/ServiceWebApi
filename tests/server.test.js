import request from 'supertest';
import  express  from 'express';
import livreRouter from '../routes/livre.route.js';
import auteurRouter from '../routes/auteurs.route.js';


const app = express();
app.use(express.json());

app.use('/api/auteur',auteurRouter);
app.use('/api/livre', livreRouter);

describe('Auteur Controller', () => {
    it('POST /api/auteur - should create a auteur', async () => {
        const res = await request(app).post('/api/auteur').send({
            nom: 'Charles',
            biographie: 'Née en 1980 à la campagne il grandit avec le quotidien de la ferme',
           
        });
       
    });
});


describe('Livre Controller', () => {
    it('POST /api/livre - should create a livre', async () => {
        const res = await request(app).post('/api/livre').send({
            titre: 'hiver',
            auteurId: 1,
            annee: '2010',
            genre: 'drama',
        });
        
    });
});

describe('Auteur Controller', () => {
    it('GET /api/auteur - should show all auteur', async () => {
        const res = await request(app).get('/api/auteur');
        expect(res.statusCode).toEqual(200);
       
    });
});
describe('Livre Controller', () => {
    it('GET /api/livre - should show all livre', async () => {
        const res = await request(app).get('/api/livre');
        expect(res.statusCode).toEqual(200);
       
    });
});

