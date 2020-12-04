const express = require ('express');
const router = express.Router();
const passport = require ('passport');
const { ensureAuthenticated } = require('../config/auth');
const User = require ('../models/user')
const existingUser = require('./users')


//Routes vedrørende profile dashboard og til andre sider
router.get('/profile', ensureAuthenticated, (req, res) => res.render('profile', {
    name: req.user.name
}))







router.get('/matches', ensureAuthenticated, (req, res) => res.render('matches',  {
    name: req.user.name
}))
router.get('/swipe', ensureAuthenticated, (req, res) => res.render('swipe', {
    name: req.user.name
}))
router.get('/Home', ensureAuthenticated, (req, res) => res.render('dashboard', {
    name: req.user.name
}))

//Routes fra profile til andre sider






module.exports = router