const express=require('express');
const router=express.Router();
const { nouvelleOffre, getAllOffres, supprimerOffre}=require('../models/offreModels')

router.get('/All',getAllOffres)

router.post('/Add',nouvelleOffre)

router.delete('/delete/:id',supprimerOffre)

module.exports= router