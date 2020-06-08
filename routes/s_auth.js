

var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { register,login } = require("../controller/s_auth");

router.post(
  "/register",
  [
    check("fullName", "name should be at least 3 char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("contact", "contact no. is required").isMobilePhone(),
    check("ShopName", "name should be at least 3 char").isLength({ min: 3 }),
    check("password", "password should be at least 3 char").isLength({ min: 3 })
  ],
  register
);

router.post(
  "/login",
  [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({ min: 1 })
  ],
  login
);

//router.get("/signout", signout);

module.exports = router;


