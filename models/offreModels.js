const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const validator = require('validator')

// add commands

async function nouvelinfo(req, res) {
  const { email, nom, numeroWhatsapp, profession } = req.body;

  // Validation des champs
  const errors = [];

  if (!validator.isEmail(email)) {
    errors.push('L\'email est invalide.');
  }

  if (!validator.isLength(nom, { min: 1 })) {
    errors.push('Le nom ne doit pas être vide.');
  } else if (!validator.matches(nom, /^[^<>]+$/)) {
    errors.push('Le nom contient des caractères non autorisés.');
  }

  if (!validator.isMobilePhone(numeroWhatsapp, 'any', { strictMode: false })) {
    errors.push('Le numéro WhatsApp est invalide.');
  }

  if (!validator.isLength(profession, { min: 1 })) {
    errors.push('La profession ne doit pas être vide.');
  } else if (!validator.matches(profession, /^[^<>]+$/)) {
    errors.push('La profession contient des caractères non autorisés.');
  }

  // Si des erreurs sont présentes, renvoyer une réponse avec un statut 400 et les messages d'erreur
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const nouvelleInfo = await prisma.InfoMail.create({
      data: {
        email: email,
        nom: nom,
        numeroWhatsapp: numeroWhatsapp,
        profession: profession,
      },
    });
    console.log('Info ajoutée avec succès :', nouvelleInfo);
    res.status(200).json(nouvelleInfo);
  } catch (erreur) {
    console.error('Erreur lors de l\'ajout de l\'info :', erreur);
    res.status(500).json({ erreur: erreur.message });
  } finally {
    await prisma.$disconnect();
  }
}

// get all commands

async function getAllinfo(req, res) {
    try {
      const toutesLesInfos = await prisma.InfoMail.findMany();
      res.status(200).json(toutesLesInfos);
    } catch (erreur) {
      console.error('Erreur lors de la récupération des commandes :', erreur);
      res.status(500).json({ erreur: erreur.message });
    }
  }

// delete commands

// delete commands
async function supprimerInfo(req, res) {
    const { id } = req.params; // Suppose que l'identifiant de la commande est passé en tant que paramètre dans l'URL
  
    try {
      const InfoSupprimee = await prisma.InfoMail.delete({
        where: {
          id: parseInt(id) // Assurez-vous de convertir l'ID en un type compatible avec Prisma, si nécessaire
        }
      });
      console.log('info supprimée avec succès :', InfoSupprimee);
      res.status(200).json(InfoSupprimee);
    } catch (erreur) {
      console.error('Erreur lors de la suppression de la commande :', erreur);
      res.status(500).json({ erreur: erreur.message });
    }
  }
  

module.exports={nouvelinfo,getAllinfo,supprimerInfo}