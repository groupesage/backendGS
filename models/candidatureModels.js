const { PrismaClient } = require('@prisma/client');
const validator = require('validator');

const prisma = new PrismaClient();

// Fonction pour ajouter une candidature
async function ajouterCandidature(req, res) {
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
    onem,
    inspection_du_travail
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
   const urlFields = { picture, cv, onem, inspection_du_travail };
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
    const nouvelleCandidature = await prisma.candidature.create({
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
        inspection_du_travail:inspection_du_travail,
      },
    });
    console.log('Candidature ajoutée avec succès :', nouvelleCandidature);
    res.status(200).json(nouvelleCandidature);
  } catch (erreur) {
    console.error('Erreur lors de l\'ajout de la candidature :', erreur);
    res.status(500).json({ erreur: erreur.message });
  } finally {
    await prisma.$disconnect();
  }
}

// Récupérer toutes les candidatures
async function getAllCandidature(req, res) {
  try {
    const toutesLesCandidatures = await prisma.candidature.findMany();
    res.status(200).json(toutesLesCandidatures);
  } catch (erreur) {
    console.error('Erreur lors de la récupération des candidatures :', erreur);
    res.status(500).json({ erreur: erreur.message });
  }
}

// Supprimer une candidature
async function supprimerCandidature(req, res) {
  const { id } = req.params;

  try {
    const candidatureSupprimee = await prisma.candidature.delete({
      where: {
        id: parseInt(id),
      },
    });
    console.log('Candidature supprimée avec succès :', candidatureSupprimee);
    res.status(200).json(candidatureSupprimee);
  } catch (erreur) {
    console.error('Erreur lors de la suppression de la candidature :', erreur);
    res.status(500).json({ erreur: erreur.message });
  }
}

module.exports = { ajouterCandidature, getAllCandidature, supprimerCandidature };
