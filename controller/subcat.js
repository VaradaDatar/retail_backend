const Category = require("../model/subcat")
 

  exports.createCategory = 
  (req, res) =>
   {
   
    const category = new Category(req.body);
   
    category.save((err, category) => 
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
            error: "NOT able to save category in DBs",
           
          });
        }
        }
 
      res.json({ category });
    });
  };
  
  exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, cate) => {
      if (err) {
        return res.status(400).json({
          error: "Category not found in DB"
        });
      }
      req.category = cate;
      next();
    });
  };
  
  
  exports.getCategory = (req, res) => {
    return res.json(req.category);
  };
  
  exports.getAllCategory =
   (req, res) => 
  {
    Category.find().exec((err, categories) => {
      if (err) {
        return res.status(400).json({
          error: "NO categories found"
        });
      }
      res.json(categories);
    });
  };
  