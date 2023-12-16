document.addEventListener('DOMContentLoaded', fetchAuteur);
document.addEventListener('DOMContentLoaded', fetchLivre);

// Fetch auteurs and render them
async function fetchAuteur() {
    try {
        const response = await fetch('/api/auteur');
        const auteurs = await response.json();
        const auteurList = document.getElementById('auteur-list');
        auteurList.innerHTML = ''; // Clear current list
        auteurs.forEach(auteur => {
            const auteurItem = document.createElement('div');
            auteurItem.innerHTML = `
                <span>${auteur.id}</span>
                <button onclick="deleteTask(${auteur.id})">Supprimer</button>
                <button onclick="editTask(${auteur.id}, '${auteur.nom}', '${auteur.biographie}')">Modifier</button>
            `;
            auteurList.appendChild(auteurItem);
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des Auteurs', error);
    }
}

async function fetchLivre() {
    try {
        const response = await fetch('/api/livre');
        const livres = await response.json();
        const livreList = document.getElementById('livre-list');
        livreList.innerHTML = ''; // Clear current list
        livres.forEach(livre => {
            const livreItem = document.createElement('div');
            livreItem.innerHTML = `
                <span>${livre.id}</span>
                <button onclick="deleteTask(${livre.id})">Supprimer</button>
                <button onclick="editTask(${livre.id}, '${livre.title}', '${livre.annee}', '${livre.genre}')">Modifier</button>
            `;
            livreList.appendChild(livreItem);
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des Livres', error);
    }
}

// Add a new Auteur
document.getElementById('auteur-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Veuillez vous connecter.');
        return;
    }
    const nom = document.getElementById('auteur-nom').value;
    const biographie = document.getElementById('auteur-biographie').value;
    try {
        await fetch('/api/auteur', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ nom, biographie })
        });
        fetchAuteur(); // Refresh the list
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l auteur', error);
        if (error.response && error.response.status === 401) {
            // Si le token est invalide ou expiré
            alert('Session expirée, veuillez vous reconnecter.');
            localStorage.removeItem('token');
          }
    }
});
// Add a new livre
document.getElementById('livre-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Veuillez vous connecter.');
        return;
    }
    const title = document.getElementById('livre-title').value;
    const annee = document.getElementById('livre-annee').value;
    const genre = document.getElementById('livre-genre').value;
    const auteur = document.getElementById('livre-auteur').value;
    try {
        await fetch('/api/livre', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, auteur,annee,genre })
        });
        fetchLivre(); // Refresh the list
    } catch (error) {
        console.error('Erreur lors de l\'ajout du livre', error);
        if (error.response && error.response.status === 401) {
            // Si le token est invalide ou expiré
            alert('Session expirée, veuillez vous reconnecter.');
            localStorage.removeItem('token');
          }
    }
});

// Delete a auteur
async function deleteAuteur(id) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Veuillez vous connecter.');
            return;
        }
        await fetch(`/api/auteur/:${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        fetchAuteur(); // Refresh the list
    } catch (error) {
        console.error('Erreur lors de la suppression de l auteur', error);
    }
}

// Delete a livre
async function deleteLivre(id) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Veuillez vous connecter.');
            return;
        }
        await fetch(`/api/livre/:${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        fetchLivre(); // Refresh the list
    } catch (error) {
        console.error('Erreur lors de la suppression du livre', error);
    }
}

// modifier un livre
async function editLivre(id, title, auteurId,annee,genre) {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Veuillez vous connecter.');
        return;
    }
    const newTitle = prompt('Modifier le title du livre:', title);
    const newAuteur = prompt('Modifier l auteur du livre:', auteurId);
    const newAnnee = prompt('Modifier l annee du livre:', annee);
    const newGenre = prompt('Modifier le genre du livre:', genre);
    if (newTitle) {
        try {
            await fetch(`/api/livre/:${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ id: id,title:newTitle,auteurId:newAuteur ,annee: newAnnee,genre:newGenre })
            });
            fetchLivre(); // Refresh the list
        } catch (error) {
            console.error('Erreur lors de la modification de la tâche', error);
        }
    }
}
// modifier un auteur
async function editAuteur(id, nom, biographie) {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Veuillez vous connecter.');
        return;
    }
    const newNom = prompt('Modifier le nom de l auteur:', nom);
    const newBiographie = prompt('Modifier la biographie de l auteur :', biographie);
  
    if (newNom) {
        try {
            await fetch(`/api/auteur/:${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ id: id,nom:newNom, biographie: newBiographie })
            });
            fetchAuteur(); // Refresh the list
        } catch (error) {
            console.error('Erreur lors de la modification de la tâche', error);
        }
    }
}


// Fonction pour s'inscrire
async function signup() {
    try {
        const email = document.getElementById('signup-email').value;
        const motDePasse = document.getElementById('signup-password').value;
      const response = await axios.post('http://localhost:4333/api/utilisateur/signup', { email, motDePasse });
      console.log('Inscription réussie', response.data);
    } catch (error) {
      console.error('Erreur lors de l\'inscription', error);
    }
  }
  
  // Fonction pour se connecter
  async function login() {
    try {
        const email = document.getElementById('login-email').value;
        const motDePasse = document.getElementById('login-password').value;
      const response = await axios.post('http://localhost:4333/api/utilisateur/login', { email, motDePasse });
      localStorage.setItem('token', response.data.token); // Stocker le token reçu
      console.log('Connexion réussie', response.data);
    } catch (error) {
      console.error('Erreur lors de la connexion', error);
    }
  }

  // Fonction pour mettre à jour un utilisateur
    async function updateUser() {
        const utilisateurid = document.getElementById('update-id').value;
        const password = document.getElementById('update-password').value;
        const role = document.getElementById('update-role-select').value;
        const token = localStorage.getItem('token'); // Assurez-vous que l'utilisateur est connecté
        // const userIdi = localStorage.getItem('userId'); // Assurez-vous que l'utilisateur est connecté
    
        if (!token) {
        alert('Vous devez être connecté pour modifier un utilisateur.');
        return;
        }
    
        try {
        // Vous devez avoir l'ID de l'utilisateur pour mettre à jour
        // const userId = userIdi;
        const response = await axios.put(`http://localhost:4333/api/utilisateur/update/${utilisateurid}`, {
            password,
            role
        }, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        });
        console.log('Utilisateur mis à jour avec succès', response.data);
        alert('Utilisateur mis à jour avec succès.');
        } catch (error) {
        console.error('Erreur lors de la mise à jour de l’utilisateur', error);
        // Vérifier si l'erreur vient de la réponse du serveur
        if (error.response) {
            alert(error.response.data.message || 'Une erreur est survenue lors de la mise à jour');
        } else {
            // Gérer les autres types d'erreurs (réseau, etc.)
            alert('Une erreur réseau est survenue');
        }
        }
    }
  
  
