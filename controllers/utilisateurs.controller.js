import bcrypt from 'bcryptjs'; // Pour le hachage des mots de passe
import jwt from 'jsonwebtoken'; // Pour créer des tokens JWT
import Utilisateurs  from '../models/utilisateurs.model.js'; // Le modèle Sequelize pour les utilisateurs

// Clé secrète pour les tokens JWT, à stocker de préférence dans une variable d'environnement
const secret = process.env.JWT_SECRET || 'your_jwt_secret';

// Fonction pour enregistrer un nouvel utilisateur
export const registerUtilisateur = async (req, res) => {
  try {
    // Récupération des données d'inscription de l'utilisateur
    const { email, motDePasse } = req.body;

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(motDePasse, 8);

    // Création de l'utilisateur avec le mot de passe haché
    const newUtilisateur = await Utilisateurs.create({
      email,
      motDePasse: hashedPassword,
      role: "utilisateur", // Par défaut, l'utilisateur aura le rôle 'utilisateur'
    });

    // Réponse avec le statut 201 (Created) et les données de l'utilisateur créé
    res.status(201).json({ Utilisateurs: [newUtilisateur] });
  } catch (error) {
    // En cas d'erreur, renvoie une réponse d'erreur
    res.status(500).json({ message: 'Erreur lors de la création de l’utilisateur', error });
  }
};

// Fonction pour connecter un utilisateur
export const loginUtilisateur = async (req, res) => {
  try {
    // Récupération des données de connexion
    const { email, motDePasse } = req.body;

    // Recherche de l'utilisateur par son nom d'utilisateur
    const utilisateur = await Utilisateurs.findOne({ where: { email } });

    // Si l'utilisateur n'est pas trouvé, renvoie une erreur 404
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérification si le mot de passe est correct
    const isPasswordCorrect = await bcrypt.compare(motDePasse, utilisateur.motDePasse);

    // Si le mot de passe est incorrect, renvoie une erreur 400
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    // Si le mot de passe est correct, création d'un token JWT
    const token = jwt.sign({ email: utilisateur.email, id: utilisateur.id, role: utilisateur.role }, secret, { expiresIn: '15min' });

    res.cookie('token', token, { httpOnly: true });

    // Renvoie les informations de l'utilisateur et le token
    res.status(200).json({ result: utilisateur, token });
  } catch (error) {
    // En cas d'erreur, renvoie une réponse d'erreur
    res.status(500).json({ message: 'Erreur lors de la connexion', error });
  }
};

// Méthode pour modifier un utilisateur
export const updateUtilisateur = async (req, res) => {
  // Récupération de l'ID de l'utilisateur à partir des paramètres de la requête
  const { id } = req.params;
  // Récupération des données à mettre à jour
  const { motDePasse, role } = req.body;

  try {
    // Recherche de l'utilisateur par son ID
    const utilisateurs = await Utilisateurs.findByPk(id);

    // Si l'utilisateur n'est pas trouvé, renvoie une erreur 404
    if (!utilisateurs) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Hachage du nouveau mot de passe s'il est fourni, sinon utilise le mot de passe actuel
    const hashedPassword = motDePasse ? await bcrypt.hash(motDePasse, 8) : utilisateurs.motDePasse;

    // Mise à jour de l'utilisateur avec les nouvelles données
    const updatedUti = await utilisateurs.update({ motDePasse: hashedPassword, role });

    // Création d'un nouveau token JWT pour l'utilisateur mis à jour
    const token = jwt.sign({ email: updatedUti.email, id: updatedUti.id, role: updatedUti.role }, secret, { expiresIn: '1h' });

    // Renvoie les informations de l'utilisateur mis à jour et le nouveau token
    res.status(200).json({ result: updatedUti, token });
  } catch (error) {
    // En cas d'erreur, renvoie une réponse d'erreur
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l’utilisateur', error });
  }
};

