const express=require('express');
const router=express.Router();
const {ajouterCommande,getAllCommands,supprimerCommande}=require('../models/candidatureModels')

router.post('/Add', upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'document', maxCount: 1 }
  ]), ajouterRealisation);
  
router.get('/All',getAllCommands)

router.post('/Add',ajouterCommande)

router.delete('/delete/:id',supprimerCommande)


module.exports= router