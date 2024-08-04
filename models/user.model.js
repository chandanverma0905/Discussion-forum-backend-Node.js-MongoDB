//import validator
const validatorData = require("validator");

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    
fullName:{
    type: String,
    maxLength: 50,
    default: ''
},

username: {
    type: String,
    unique: true,
    required: true,
    maxLength: 25
},

email: {
    type: String,
    unique: true,
    required: true,
    validate:{ 
    validator :(emailValue)=> validatorData.isEmail(emailValue),
    message: 'Invalid Email Format'
    }
}

});

const User = mongoose.model("User", userSchema);


module.exports = User;