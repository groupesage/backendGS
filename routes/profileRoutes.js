const express=require('express');
const router=express.Router();
const {ajouterprofile, getAllprofile, supprimerprofile}=require('../models/profileModels')


router.get('/All',getAllprofile)

router.post('/Add',ajouterprofile)

// router.put('/edit/:id',)

router.delete('/delete/:id',supprimerprofile)

module.exports= router