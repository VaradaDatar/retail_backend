const express = require('express')

const router = express.Router();

const {getCategoryById,
  createCategory,
  getCategory,
  getAllCategory,
 } = require("../controller/subcat");

router.param("categoryId", getCategoryById);

router.post(
  "/subcategory/create/",
  
  createCategory
);

router.get("/subcategory/:categoryId", getCategory);
router.get("/subcategories", getAllCategory);
module.exports = router;