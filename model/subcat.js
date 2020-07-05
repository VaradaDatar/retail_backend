var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
// const crypto = require("crypto");
// const uuidv1 = require("uuid/v1");

const subcategorySchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        unique:true
    }
   
},
  { timestamps: true }
);


module.exports = mongoose.model("Subcategory",subcategorySchema);



