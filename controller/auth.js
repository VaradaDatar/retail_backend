
const User = require("../model/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt"); 

exports.signup = (req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg
      });
    }
  
    const user = new User(req.body);
    user.save((err, user) => {
      if (err) {
        return res.status(400).json({
          err: "NOT able to save user in DB"
        });
      }
      res.json({
        fullName: user.fullName,
        email: user.email,
        id: user._id
      });
    });
  };
  

  exports.signin = (req, res) => {
    // const errors = validationResult(req);
     const { email, password } = req.body;
   
   //   if (!errors.isEmpty()) {
   //     return res.status(422).json({
   //       error: errors.array()[0].msg
   //     });
   //   }
   
     User.findOne({ email }, (err, user) => {
       if (err || !user) {
         return res.status(400).json({
           error: "USER email does not exists"
         });
       }
   
       if (!user.autheticate(password)) {
         return res.status(401).json({
           error: "Email and password do not match"
         });
       }
   
       
       const { _id,fullName,email,contact,purchases } = user;
       return res.json({  user: { _id,fullName,email,contact,purchases } });
     });
   }
   exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, use) => {
      if (err) {
        return res.status(400).json({
          error: "User not found in DB"
        });
      }
      req.user = use;
      next();
    });
  };
  
  
  exports.getUser = (req, res) => {
    return res.json(req.user);
  };
  
  exports.getAllUser =
   (req, res) => 
  {
    User.find().exec((err, users) => {
      if (err) {
        return res.status(400).json({
          error: "NO User found"
        });
      }
      res.json(users);
    });
  };
  
   exports.updateUser = (req, res) => {
    
    const user = req.user;
   
   // user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.contact = req.body.contact;
    user.password = req.body.password;
  
    user.save((err, updatedUser) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to update user"
        });
      }
      res.json(updatedUser);
    });
  };

  exports.removeUser = (req, res) => {
   
   
    const user = req.user;
  
    user.remove((err, user) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete this user"
        });
      }
      res.json({
        message: "Successfully deleted"
      });
    });
  };
  