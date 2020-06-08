const Product = require("../model/product")


  exports.createProduct = 
  (req, res) =>
   {
   
    const product = new Product(req.body);
   
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
      req.product = cate;
      next();
    });
  };
  
  
  exports.getProduct = (req, res) => {
    return res.json(req.product);
  };
  
  exports.getAllProduct =
   (req, res) => 
  {
    Product.find().exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "NO categories found"
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
        message: "Successfull deleted"
      });
    });
  };
