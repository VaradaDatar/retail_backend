var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
// const crypto = require("crypto");
// const uuidv1 = require("uuid/v1");

const categorySchema = new mongoose.Schema({
  id1:{
    type:ObjectId,
    required:true
  },
  name:{
        type:String,
        trim:true,
        required:true,
        //unique:true
    },
    subcat: {                          // Men's or Women's or Kid's
    type: ObjectId,
    ref: "subcat",
    required: true
      }
    
},
  { timestamps: true }
);


module.exports = mongoose.model("Category",categorySchema);






