const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const sellersSchema = new mongoose.Schema(
  {
    sellerName: { type: String, required: true },
    password: { type: String, trim: true, required: true, minlength: [8, "Password 8 characters minimum"] },
    rol: { type: String, required: true, enum: ["admin", "seller"],
      default: "seller",
    }
    },
  {
    timestamps: true,
    collection: "seller",
  }
);

sellersSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 10);
});

const Sellers = mongoose.model("seller", sellersSchema, "seller");

module.exports = Sellers;