const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, trim: true, required: true, minlength: [8, "Password 8 characters minimum"] },
    role: { type: String, required: true, enum: ["user", "seller", "admin"], default: "user" },
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }]
    },
  {
    timestamps: true,
    collection: "users",
  }
);

userSchema.pre("save", function () {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
});

const Users = mongoose.model("users", userSchema, "users");

module.exports = Users;