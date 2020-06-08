var mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

var sellerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true
    },
    
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    contact: {
      type: Number,
      trim: true,
      unique: true
    },
    ShopName: {
        type: String,
        trim: true,
        required: true,
        unique: true
      },
    password: {
      type: String,
      required: true
    },
    sells: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);


sellerSchema.methods = {
    autheticate: function(plainpassword) {
    return plainpassword === this.password;
  },

  
};


module.exports = mongoose.model("Seller", sellerSchema);

