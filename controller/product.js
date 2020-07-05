const  Product= require("../model/product");
const  Category= require("../model/category");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
var multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

var upload = multer({ storage: storage })

exports.createProduct = 
  (req, res) =>
   {
    const product = new Product(req.body);
    
    product.productImagePath = req.file.path;

    product.save((err, product) => 
    {
      if (err) 
      {

        if(err.code === 11000 || err.code === 11001)
        {
          return res.status(400).json({
            error: "Duplicate Value " +req.body.name +",Value must be unique",
           
          });
        }
        else
        {
          return res.status(400).json({
            error: "NOT able to save product in DBs",
           
          });
        }
        }
 
      res.json({ product });
    });
  };
  
  exports.getProductById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found in DB"
        });
      }
      req.product = product;
      next();
    });
  };
  
  exports.getProductByCategoryId = (req, res, next, id) => {
    Product.find({ category : req.params.categoryId })
    .exec(function (err, product) {
      if (err){
        if(err.kind === 'ObjectId') {
          return res.status(404).send({
            message: "Products not found with given category Id " + req.params.categoryId
          });                
        }
        return res.status(500).send({
          message: "Error retrieving Products with given category Id " + req.params.categoryId
        });
      }
            
      res.send(product);
    });
  };
  
  exports.getProduct = (req, res) => {
    return res.json(req.product);
  };
  exports.getCProduct = (req, res) => {
    return res.json(req.product);
  };
  
  exports.getAllProduct =
   (req, res) => 
  {
    Product.find().exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "NO products found"
        });
      }
      res.json(product);
    });
  };
  
  exports.updateProduct = (req, res) => {
    
    const product = req.product;
   
    product.name = req.body.name;
  
    product.save((err, updatedProduct) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to update product"
        });
      }
      res.json(updatedProduct);
    });
  };
  
  exports.removeProduct = (req, res) => {
   
   
    const product = req.product;
  
    product.remove((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete this product"
        });
      }
      res.json({
        message: "Successfully deleted"
      });
    });
  };
