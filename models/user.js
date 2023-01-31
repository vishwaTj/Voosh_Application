const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phoneNum:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    //including the orders as an array
    Orders:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Order'

        }
    ]
},{
    timestamps:true
})

//Encryption of the password
UserSchema.pre('save',async function(next){
    try{
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password,salt);
      this.password= hashedPassword;
    next();
    }catch(error){
        next(error);
    }
})

// compare encrypted password durin login
UserSchema.methods.comparePassword = function(password, callback) {
    const user = this;
    bcrypt.compare(password, this.password, function(error, isMatch) {
      if (error) {
        return callback(error)
      } else {
        callback(null, isMatch)
      }
    })
  }

const User = mongoose.model('User',UserSchema);
module.exports = User;