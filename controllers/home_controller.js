const { updateMany } = require("../models/order");
const bcrypt = require("bcryptjs");
const Order = require("../models/order");

const User = require('../models/user');

module.exports.home = function(req,res){
    return res.render('home');
}

module.exports.home = function(req,res){
  console.log('home2');
  return res.render('home');
}

module.exports.login = function(req,res){
    return res.render('login');
}

module.exports.signup = function(req,res){
    return res.render('signup');
}

module.exports.adduser = function(req,res){
  // console.log(req.body); 
     if(req.body.password != req.body.confirm_password){
          return res.redirect('back');
      }

      User.findOne({phoneNum:req.body.phoneNum}, function(err,user){
        if(err){
          console.log(`Error in creating new user while sign up`);
          return;
        }
        if(!user){
          User.create({
            name:req.body.name,
            phoneNum:req.body.phoneNum,
            password:req.body.password
          },function(error,user){
            if(err){console.log('error in createing user while signing up'); return}
            res.redirect('/');
          })
        }
      })
}

module.exports.signin = function(req,res){
  User.findOne({phoneNum:req.body.phoneNum}, function(err,user){
    user.comparePassword(req.body.password, function(matchError, isMatch) {
      if (matchError) {
        console.log('Error in matching');
      } else if (!isMatch) {
        console.log('Password does not match');
        return res.redirect('back');
      } else {
        console.log("password matches");
        User.findOne({phoneNum:req.body.phoneNum})
        .populate({
          path:'Orders'
        })
        .exec(function(err,user){
          if(err){
             console.log("there was an error:"+" "+err);
          }
          return res.render('food_page',{
            id:user.id,
            user:user
          });
      })
      }
    })
  })

}

module.exports.createRecipe = function(req,res){
  // console.log("Recipe done "+req.params.id);
  let uid = req.params.id;
  User.findById(uid,function(err,user){
    if(err){
      console.log("Error in finding user");
    }
    let userid = user._id;
    if(user){
     Order.create(req.body,function(err,order){
        if(err){
         console.log('Error in creating order');
        }
       user.Orders.push(order);
       user.save(); 
     })
    }
  })
  User.findById(uid)
  .populate({
     path:'Orders'})
     .exec(function(err,user){
      if(err){
         console.log("there was an error:"+" "+err);
      }
      return res.render('food_page',{
        id:user.id,
        user:user
      });
  })   
   
}
