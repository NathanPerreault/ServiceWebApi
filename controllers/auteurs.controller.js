import Auteur from '../models/auteurs.model.js';



export const createAuteur = async (req, res) => {
    try {
        // Validation des données entrantes (req.body) peut être ajoutée ici
        const newAuteur = await Auteur.create(req.body);
        res.status(201).json(newAuteur);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de l'auteur", error: error.message });
    }
};

// Obtenir tous les auteurs
export const getAllAuteurs = async (req, res) => {
    try {
        const newAuteur = await Auteur.findAll();
        res.status(200).json(newAuteur);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des auteurs", error: error.message });
    }
};


// Obtenir un auteur par ID
export const getAuteurById = async (req, res) => {
    try {
        const idAuteur = req.params.id;
        const newAuteur = await Auteur.findByPk(idAuteur);
        if (newAuteur) {
            res.status(200).send(newAuteur);
        } else {
            res.status(404).send({ message: 'Auteur non trouvé' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

// Supprimer un auteur

export const deleteAuteur = async (req, res, next) => {
    try {
      const newAuteur = await Auteur.findByPk(req.params.id);
      if (newAuteur) {
        await newAuteur.destroy();
        res.status(200).json({ message: 'Auteur supprimer' });
      } else {
        res.status(404).json({ message: 'Auteur non trouvé' });
      }
    } catch (error) {
      next(error);
    }
  };



// Mettre à jour un auteur


export const updateAuteur = async (req, res, next) => {
    try {
      const newAuteur = await Auteur.findByPk(req.params.id);
      if (newAuteur) {
        await newAuteur.update(req.body);
        res.status(200).json(newAuteur);
      } else {
        res.status(404).json({ message: 'Auteur non trouvé' });
      }
    } catch (error) {
      next(error);
    }
  };






