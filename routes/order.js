
const express = require("express");
const router = express.Router();



const {getOrderById,
  createOrder,
  getAllOrder,
  getOrder,
  updateOrder,
  removeOrder} = require("../controller/order");

//params
router.param("orderId", getOrderById);

//Actual routes
//create
router.post(
  "/order/create",

  createOrder
);

router.get("/order/:orderId", getOrder);
  router.get("/order", getAllOrder);

  
  //update
  router.put(
    "/order/:orderId",
   
    updateOrder
  );
  
  //delete
  
  router.delete(
    "/order/:orderId",
  
    removeOrder
  );
  
  
  module.exports = router;
  