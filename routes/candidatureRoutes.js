const express=require('express');
const router=express.Router();
const {ajouterCandidature,getAllCandidature,supprimerCandidature}=require('../models/candidatureModels')

  
router.get('/All',getAllCandidature)

router.post('/Add',ajouterCandidature)

router.delete('/delete/:id',supprimerCandidature)


module.exports= router