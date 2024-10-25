const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const validator = require('validator')

// add commands

async function ajouterCommande(req, res) {
  const { name, email, description } = req.body;

  // Validation des champs
  const errors = [];

  if (!validator.isLength(name, { min: 1 })) {
    errors.push('Le nom ne doit pas être vide.');
  } else if (!validator.matches(name, /^[^<>]+$/)) {
    errors.push('Le nom contient des caractères non autorisés.');
  }

  if (!validator.isEmail(email)) {
    errors.push('L\'email est invalide.');
  }

  if (!validator.isLength(description, { min: 1 })) {
    errors.push('La description ne doit pas être vide.');
  } else if (!validator.matches(description, /^[^<>]+$/)) {
    errors.push('La description contient des caractères non autorisés.');
  }

  // Si des erreurs sont présentes, renvoyer une réponse avec un statut 400 et les messages d'erreur
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const nouvelleCommande = await prisma.commandes.create({
      data: {
        name: name,
        email: email,
        description: description,
      },
    });
    console.log('Commande ajoutée avec succès :', nouvelleCommande);
    res.status(200).json(nouvelleCommande);
  } catch (erreur) {
    console.error('Erreur lors de l\'ajout de la commande :', erreur);
    res.status(500).json({ erreur: erreur.message });
  } finally {
    await prisma.$disconnect();
  }
}

// get all commands

async function getAllCommands(req, res) {
    try {
      const toutesLesCommandes = await prisma.commandes.findMany();
      res.status(200).json(toutesLesCommandes);
    } catch (erreur) {
      console.error('Erreur lors de la récupération des commandes :', erreur);
      res.status(500).json({ erreur: erreur.message });
    }
  }

// delete commands

// delete commands
async function supprimerCommande(req, res) {
    const { id } = req.params; // Suppose que l'identifiant de la commande est passé en tant que paramètre dans l'URL
  
    try {
      const commandeSupprimee = await prisma.commandes.delete({
        where: {
          id: parseInt(id) // Assurez-vous de convertir l'ID en un type compatible avec Prisma, si nécessaire
        }
      });
      console.log('Commande supprimée avec succès :', commandeSupprimee);
      res.status(200).json(commandeSupprimee);
    } catch (erreur) {
      console.error('Erreur lors de la suppression de la commande :', erreur);
      res.status(500).json({ erreur: erreur.message });
    }
  }
  

module.exports={ajouterCommande,getAllCommands,supprimerCommande}