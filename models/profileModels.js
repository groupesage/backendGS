const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


// add realisation

async function ajouterRealisation(req, res) {
    const { titre,description,lienDemo } = req.body;
    const photoPath = req.file.path
  
    try {
      const nouvellerealisation = await prisma.Realisation.create({
        data: {
          photo:photoPath,
          titre:titre,
          description:description,
          lienDemo:lienDemo
        },
      });
      console.log('realisation ajoutée avec succès :', nouvellerealisation);
      res.status(200).json(nouvellerealisation);
    } catch (erreur) {
      console.error('Erreur lors de l\'ajout de la realisation :', erreur);
      res.status(500).json({ erreur: erreur.message });
    } finally {
      await prisma.$disconnect();
    }
  }

// get all realisation

async function getAllrealisations(req, res) {
    try {
      const toutesLesrealisations = await prisma.Realisation.findMany();
      res.status(200).json(toutesLesrealisations);
    } catch (erreur) {
      console.error('Erreur lors de la récupération des realisations :', erreur);
      res.status(500).json({ erreur: erreur.message });
    }
  }

// delete realisation

// delete realisation
async function supprimerRealisation(req, res) {
    const { id } = req.params; // Suppose que l'identifiant de la commande est passé en tant que paramètre dans l'URL
  
    try {
      const realisationSupprimee = await prisma.Realisation.delete({
        where: {
          id: parseInt(id) // Assurez-vous de convertir l'ID en un type compatible avec Prisma, si nécessaire
        }
      });
      console.log('Realisation supprimée avec succès :', realisationSupprimee);
      res.status(200).json(realisationSupprimee);
    } catch (erreur) {
      console.error('Erreur lors de la suppression de la realisation :', erreur);
      res.status(500).json({ erreur: erreur.message });
    }
  }


  
  // update realisation
async function modifierRealisation(req, res) {
  const { id } = req.params; // Suppose que l'identifiant de la réalisation est passé en tant que paramètre dans l'URL
  const { email, photo, titre, description, lienDemo } = req.body;

  try {
    const realisationModifiee = await prisma.Realisation.update({
      where: {
        id: parseInt(id) // Assurez-vous de convertir l'ID en un type compatible avec Prisma, si nécessaire
      },
      data: {
        email: email,
        photo: photo,
        titre: titre,
        description: description,
        lienDemo: lienDemo
      }
    });
    console.log('Realisation modifiée avec succès :', realisationModifiee);
    res.status(200).json(realisationModifiee);
  } catch (erreur) {
    console.error('Erreur lors de la modification de la réalisation :', erreur);
    res.status(500).json({ erreur: erreur.message });
  }
}



module.exports={ajouterRealisation,getAllrealisations,supprimerRealisation, modifierRealisation}