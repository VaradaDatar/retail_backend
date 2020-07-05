const express = require("express");
const router = express.Router();
var multer  = require('multer');
 

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null,file.originalname);
  }
});

var upload = multer({ storage: storage })
const {getProductById,
    createProduct,
    getProduct,
    getAllProduct,
    updateProduct,
    removeProduct,
    getProductByCategoryId,
    getCProduct} = require("../controller/product");
    
  
  router.param("productId", getProductById);
  router.param("categoryId", getProductByCategoryId);
  
  router.post(
    "/product/create/",
    upload.single('productImage'),
    createProduct
  );
  
  router.get("/product/:productId", getProduct);
  router.get("/product/category/:categoryId", getCProduct);
  router.get("/product", getAllProduct);
  
  //update
  router.put(
    "/product/:productId",
   
    updateProduct
  );
  
  //delete
  
  router.delete(
    "/product/:productId",
  
    removeProduct
  );
  
  
  module.exports = router;
  