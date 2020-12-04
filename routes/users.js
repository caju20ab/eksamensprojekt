const express = require ('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require ('passport')

//Henter min User model, så jeg kan lave noget logik bag denne
const User = require('../models/user')


//Login page
router.get('/login', (req, res)=> res.render('login'))

//Register page 
router.get('/register', (req, res) => res.render('register'));

//Register Handle
router.post('/register', (req, res) => {
const { name, email, age, Gender,prefGender, password, password2 } = req.body;
let errors = [];


//Check required fields
if (!name || !email || !age || !Gender || !prefGender || !password || !password2) {
    errors.push ({ msg: 'Please fill all required fields' })
}

/*//Check age metode som vi forsøgtet at få 
if (age > 100 && age < 18){
    errors.push ({msg:'You must be between 18 - 100 to create a user'})
}*/

//Check if passwords are matching

if(password !== password2){
    errors.push({ msg:'Passwords does not match' })
}

//Check password length

if(password.length <6)
errors.push({ msg:'Password has to be more than 6 characters' })

if (errors.length > 0){
 res.render('register', {
errors,
name,
email,
age,
password,
password2
});

}else{
User.findOne({email: email})
.then(user => {
    if(user){
        //User already exists
        errors.push({ msg: 'Email is already registered' });
        res.render('register', {
            errors,
            name,
            email,
            age,
            Gender,
            prefGender,
            password,
            password2
    });
}else{
    const newUser = new User ({
        name,
        email,
        age,
        password,
        Gender,
        prefGender
    })
//HASH adgangskode
    bcrypt.genSalt(10, (err, salt) => 
    bcrypt.hash(newUser.password, salt, (err, hash) => {

        if(err) throw err;
//Set password
        newUser.password = hash
//Save password
newUser.save()
.then(user => {
    req.flash('success_msg', 'You are now registered. Log in and find your match')
    res.redirect('/users/login')
})
.catch(err => console.log(err))
    }))
}
});
}})

//Login handle

router.post('/login', (req, res, next) => {
    passport.authenticate('local',{
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
})

//Logout handle
router.get('/logout', (req, res) => {
    req.logOut();
    req.flash ('success_msg', 'You are now logged out');
    res.redirect('/users/login')
})



module.exports = router
