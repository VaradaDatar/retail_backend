const express = require("express");
const router = express.Router();

const {getProductById,
    createProduct,
    getProduct,
    getAllProduct,
    updateProduct,
    removeProduct} = require("../controller/product");
  
  router.param("productId", getProductById);
  
  router.post(
    "/product/create/",
    
    createProduct
  );
  
  router.get("/product/:productId", getProduct);
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
  