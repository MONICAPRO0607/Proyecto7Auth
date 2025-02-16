const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const customersSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    password: { type: String, trim: true, required: true, minlength: [8, "Password 8 characters minimum"] },
    rol: { type: String, required: true, enum: "customer", default: "customer",
    }
    },
  {
    timestamps: true,
    collection: "customer",
  }
);

customersSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 10);
});

const Customers = mongoose.model("customer", customersSchema, "customer");

module.exports = Customers;