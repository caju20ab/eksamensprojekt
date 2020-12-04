const LocalStrategy = require('passport-local').Strategy
const mongoose = require ('mongoose')
const bcrypt = require ('bcryptjs')

//Bringing in the user model

const User = require('../models/user')

module.exports = function(passport){
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email,password,done) => {
            //Match the user with what the information given in the register
            User.findOne ({email: email})
            .then (user => {
                if (!user){
                return done (null, false, { message: 'The email is not registered' })
            }
            //Matching the password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw (err)

                if(isMatch){
                    return done(null, user);
                }else{
                    return done(null, false, {message: 'The given password is not correct'})
                }

            })
        })
            .catch (err => console.log(err))

        })
    )
    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
          done(err, user);
        });
      });

}