const express = require('express');
//for at bruge express router må jeg lave nedenstående variabel
const router = express.Router();
const { ensureAuthenticated } = require ('../config/auth')

//Velkommen til hjemmesiden!!! Når jeg har brug for at lave en route skriver jeg simpelt nok bare det forneden. 
router.get('/', (req, res) => res.render ('Welcome'));
//DASHBOARD siden
router.get('/dashboard', ensureAuthenticated, (req, res) => 
res.render ('dashboard',{
    name: req.user.name
}));




module.exports = router

