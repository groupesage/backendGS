const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const validator = require('validator');

// Ajouter une nouvelle offre
async function nouvelleOffre(req, res) {
  const { poste, entreprise, lieu, typecontrat, salaire, dateDebut } = req.body;

  // Validation des champs
  const errors = [];

  if (!validator.isLength(poste, { min: 1 })) {
    errors.push('Le poste ne doit pas être vide.');
  }

  if (!validator.isLength(entreprise, { min: 1 })) {
    errors.push("L'entreprise ne doit pas être vide.");
  }

  if (!validator.isLength(lieu, { min: 1 })) {
    errors.push('Le lieu ne doit pas être vide.');
  }

  if (!validator.isLength(typecontrat, { min: 1 })) {
    errors.push('Le type de contrat ne doit pas être vide.');
  }

  if (!validator.isLength(salaire, { min: 1 })) {
    errors.push('Le salaire ne doit pas être vide.');
  }

  if (!validator.isISO8601(dateDebut)) {
    errors.push('La date de début doit être au format ISO8601 (YYYY-MM-DD).');
  }

  // Si des erreurs sont présentes, renvoyer une réponse avec un statut 400 et les messages d'erreur
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const nouvelleOffre = await prisma.offre.create({
      data: {
        poste,
        entreprise,
        lieu,
        typecontrat,
        salaire,
        dateDebut,
      },
    });
    console.log('Offre ajoutée avec succès :', nouvelleOffre);
    res.status(200).json(nouvelleOffre);
  } catch (erreur) {
    console.error("Erreur lors de l'ajout de l'offre :", erreur);
    res.status(500).json({ erreur: erreur.message });
  } finally {
    await prisma.$disconnect();
  }
}

// Récupérer toutes les offres
async function getAllOffres(req, res) {
  try {
    const toutesLesOffres = await prisma.offre.findMany();
    res.status(200).json(toutesLesOffres);
  } catch (erreur) {
    console.error('Erreur lors de la récupération des offres :', erreur);
    res.status(500).json({ erreur: erreur.message });
  }
}

// Supprimer une offre
async function supprimerOffre(req, res) {
  const { id } = req.params; // L'ID de l'offre à supprimer

  try {
    const offreSupprimee = await prisma.offre.delete({
      where: {
        id: parseInt(id), // Conversion de l'ID en entier
      },
    });
    console.log('Offre supprimée avec succès :', offreSupprimee);
    res.status(200).json(offreSupprimee);
  } catch (erreur) {
    console.error("Erreur lors de la suppression de l'offre :", erreur);
    res.status(500).json({ erreur: erreur.message });
  }
}

module.exports = { nouvelleOffre, getAllOffres, supprimerOffre };
