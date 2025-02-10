const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const sellersSchema = new mongoose.Schema(
  {
    sellersName: { type: String, required: true },
    password: { type: String, required: true },
    rol: { type: String, required: true, enum: ["admin", "sellers"],
      default: "sellers",
    }
    },
  {
    timestamps: true,
    collection: "sellers",
  }
);

sellersSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 10);
});

const Sellers = mongoose.model("sellers", sellersSchema, "sellers");

module.exports = Sellers;