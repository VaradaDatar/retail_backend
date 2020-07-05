const express = require('express')

const router = express.Router();

const {getCategoryById,
  getCategoryBySubId,
  createCategory,
  getCategory,
  getSCategory,
  getAllCategory,
  updateCategory,
  removeCategory} = require("../controller/category");

router.param("categoryId", getCategoryById);
router.param("subcatId", getCategoryBySubId);

router.post(
  "/category/create/",
  
  createCategory
);

router.get("/category/:categoryId", getCategory);
router.get("/category/sub/:subcatId", getSCategory);
router.get("/categories", getAllCategory);

//update
router.put(
  "/category/:categoryId",
 
  updateCategory
);

//delete

router.delete(
  "/category/:categoryId",

  removeCategory
);


module.exports = router;
