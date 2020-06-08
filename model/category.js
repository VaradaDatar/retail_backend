var mongoose = require("mongoose");
// const crypto = require("crypto");
// const uuidv1 = require("uuid/v1");

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    subcat: {                          // Men's or Women's or Kid's
        type: String,
        required: true 
      }
    
},
  { timestamps: true }
);


module.exports = mongoose.model("Category",categorySchema);






