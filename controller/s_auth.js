
const Seller = require("../model/seller");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.register = (req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg
      });
    }
  
    const seller = new Seller(req.body);
    seller.save((err, seller) => {
      if (err) {
        return res.status(400).json({
          err: "NOT able to save seller in DB"
        });
      }
      res.json({
        gst: seller.GST,
        email: seller.email,
        id: seller._id
      });
    });
  };
  

  exports.login = (req, res) => {
  
     const { email, password } = req.body;
   
     Seller.findOne({ email }, (err, seller) => {
       if (err || !seller) {
         return res.status(400).json({
           error: "seller email does not exists"
         });
       }
   
       if (!seller.autheticate(password)) {
         return res.status(401).json({
           error: "Email and password do not match"
         });
       }
       const { _id, name, email } = seller;
       return res.json({  seller: { _id, name, email } });
     });
   }