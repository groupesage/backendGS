const express=require('express');
const router=express.Router();
const {ajouterRealisation,getAllrealisations,supprimerRealisation, modifierRealisation}=require('../models/profileModels')
const upload=require('../uploadsImages')

router.get('/All',getAllrealisations,)

router.post('/Add',upload.single("photo"),ajouterRealisation)

router.put('/edit/:id',modifierRealisation)

router.delete('/delete/:id',supprimerRealisation)

module.exports= router