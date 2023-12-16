// Exportation de la fonction 'authorize' comme middleware
export function authorize(roles = []) {
    // Le paramètre 'roles' peut être une chaîne représentant un seul rôle (par exemple 'admin')
    // ou un tableau de rôles (par exemple ['admin', 'user'])
    // Si 'roles' est une chaîne, on le transforme en tableau avec un seul élément
    if (typeof roles === 'string') {
        roles = [roles];
    }

    // La fonction retournée est le middleware effectif qui sera appelé par Express
    return (req, res, next) => {
        // Récupération de l'utilisateur à partir de l'objet 'req'
        // Cet utilisateur est généralement attaché dans un middleware d'authentification précédent
        const utilisateur = req.utilisateur;

        // Vérification si l'utilisateur existe et si son rôle correspond à l'un des rôles autorisés
        // Si l'utilisateur n'existe pas ou si son rôle n'est pas autorisé, renvoie une erreur 403
        if (!utilisateur || (roles.length && !roles.includes(utilisateur.role))) {
            // Le rôle de l'utilisateur n'est pas autorisé
            return res.status(403).json({ message: 'Accès interdit' });
        }

        // Si l'utilisateur a le bon rôle, le middleware laisse passer la requête au prochain gestionnaire
        next();
    };
}