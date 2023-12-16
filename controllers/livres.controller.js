import Livre from '../models/livres.model.js';



export const createLivre = async (req, res) => {
    try {
        // Validation des données entrantes (req.body) peut être ajoutée ici
        const newLivre = await Livre.create(req.body);
        res.status(201).json(newLivre);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création du livre", error: error.message });
    }
};

// Obtenir tous les livres
export const getAllLivres = async (req, res) => {
    try {
        const newLivre = await Livre.findAll();
        res.status(200).json(newLivre);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des livres", error: error.message });
    }
};


// Obtenir un livre par ID
export const getLivreById = async (req, res) => {
    try {
        const idlivre = req.params.id;
        const newLivre = await Livre.findByPk(idlivre);
        if (newLivre) {
            res.status(200).send(newLivre);
        } else {
            res.status(404).send({ message: 'Livre non trouvé' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

// Supprimer un livre

export const deleteLivre = async (req, res, next) => {
    try {
      const newLivre = await Livre.findByPk(req.params.id);
      if (newLivre) {
        await newLivre.destroy();
        res.status(200).json({ message: 'Livre supprimer' });
      } else {
        res.status(404).json({ message: 'Livre non trouvé' });
      }
    } catch (error) {
      next(error);
    }
  };



// Mettre à jour un livre


export const updateLivre = async (req, res, next) => {
    try {
      const newLivre = await Livre.findByPk(req.params.id);
      if (newLivre) {
        await newLivre.update(req.body);
        res.status(200).json(newLivre);
      } else {
        res.status(404).json({ message: 'Livre non trouvé' });
      }
    } catch (error) {
      next(error);
    }
  };






