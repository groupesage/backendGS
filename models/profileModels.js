const { PrismaClient } = require('@prisma/client');
const validator = require('validator');

const prisma = new PrismaClient();

// Fonction pour ajouter une profile
async function ajouterprofile(req, res) {
  // Récupération des données envoyées
  const {
    first_name,
    last_name,
    date_naissance,
    lieu_naissance,
    address,
    phone,
    email,
    studylevel,
    profession,
    picture,
    cv,
    onem
  } = req.body;
  
  console.log(req.body)

   // Validation des champs
   const errors = [];

   // Validation pour le prénom
   if (!validator.isLength(first_name, { min: 1 })) {
     errors.push('Le prénom ne doit pas être vide.');
   } else if (!validator.matches(first_name, /^[^<>]+$/)) {
     errors.push('Le prénom contient des caractères non autorisés.');
   }
 
   // Validation pour le nom de famille
   if (!validator.isLength(last_name, { min: 1 })) {
     errors.push('Le nom de famille ne doit pas être vide.');
   } else if (!validator.matches(last_name, /^[^<>]+$/)) {
     errors.push('Le nom de famille contient des caractères non autorisés.');
   }
 
   // Validation pour la date de naissance
   if (!validator.isISO8601(date_naissance)) {
     errors.push('La date de naissance doit être au format ISO 8601 (YYYY-MM-DD).');
   }
 
   // Validation pour le lieu de naissance
   if (!validator.isLength(lieu_naissance, { min: 1 })) {
     errors.push('Le lieu de naissance ne doit pas être vide.');
   } else if (!validator.matches(lieu_naissance, /^[^<>]+$/)) {
     errors.push('Le lieu de naissance contient des caractères non autorisés.');
   }
 
   // Validation pour l'adresse
   if (!validator.isLength(address, { min: 1 })) {
     errors.push('L\'adresse ne doit pas être vide.');
   } else if (!validator.matches(address, /^[^<>]+$/)) {
     errors.push('L\'adresse contient des caractères non autorisés.');
   }
 
   // Validation pour le téléphone
   if (!validator.isMobilePhone(phone, 'any', { strictMode: false })) {
     errors.push('Le numéro de téléphone est invalide.');
   }
 
   // Validation pour l'email
   if (!validator.isEmail(email)) {
     errors.push('L\'email est invalide.');
   }
 
   // Validation pour le niveau d'étude
   if (!validator.isLength(studylevel, { min: 1 })) {
     errors.push('Le niveau d\'étude ne doit pas être vide.');
   } else if (!validator.matches(studylevel, /^[^<>]+$/)) {
     errors.push('Le niveau d\'étude contient des caractères non autorisés.');
   }
 
   // Validation pour la profession
   if (!validator.isLength(profession, { min: 1 })) {
     errors.push('La profession ne doit pas être vide.');
   } else if (!validator.matches(profession, /^[^<>]+$/)) {
     errors.push('La profession contient des caractères non autorisés.');
   }
 
   // Validation pour les URLs
   const urlFields = { picture, cv, onem };
   for (const [key, value] of Object.entries(urlFields)) {
     if (!validator.isURL(value)) {
       errors.push(`L'URL de ${key} est invalide.`);
     }
   }
 
   // Si des erreurs sont présentes, renvoyer une réponse avec un statut 400 et les messages d'erreur
   if (errors.length > 0) {
     return res.status(400).json({ errors });
   }
  
   // fin des validations 

  try {
    const nouvelleprofile = await prisma.profile.create({
      data: {
        first_name:first_name,
        last_name:last_name,
        date_naissance:date_naissance,
        lieu_naissance:lieu_naissance,
        address:address,
        phone:phone,
        email:email,
        studylevel:studylevel,
        profession:profession,
        picture:picture,
        cv:cv,
        onem:onem,
         },
    });
    console.log('profile ajoutée avec succès :', nouvelleprofile);
    res.status(200).json(nouvelleprofile);
  } catch (erreur) {
    console.error('Erreur lors de l\'ajout de la profile :', erreur);
    res.status(500).json({ erreur: erreur.message });
  } finally {
    await prisma.$disconnect();
  }
}

// Récupérer toutes les profiles
async function getAllprofile(req, res) {
  try {
    const toutesLesprofiles = await prisma.profile.findMany();
    res.status(200).json(toutesLesprofiles);
  } catch (erreur) {
    console.error('Erreur lors de la récupération des profiles :', erreur);
    res.status(500).json({ erreur: erreur.message });
  }
}

// Supprimer une profile
async function supprimerprofile(req, res) {
  const { id } = req.params;

  try {
    const profileSupprimee = await prisma.profile.delete({
      where: {
        id: parseInt(id),
      },
    });
    console.log('profile supprimée avec succès :', profileSupprimee);
    res.status(200).json(profileSupprimee);
  } catch (erreur) {
    console.error('Erreur lors de la suppression de la profile :', erreur);
    res.status(500).json({ erreur: erreur.message });
  }
}

module.exports = { ajouterprofile, getAllprofile, supprimerprofile };
