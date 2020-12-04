const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema({
name: {
    type: String,
    required: true
},
email: {
    type: String,
    required: true
},
age: {
    type: String,
    required: true
},

Gender: {
    type: String,
    required: true
},
prefGender: {
    type: String,
    required: true
},

password: {
    type: String,
    required: true
},
date: {
    type: Date,
    default: Date.now
},
})

const User = mongoose.model('User', userSchema)

module.exports = User