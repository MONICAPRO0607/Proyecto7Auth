const mongoose = require("mongoose");

const articlesSchema = new mongoose.Schema({
  name: {type: String, required: true},
  author: {type: String, required: true},
  img: {type: String, required: true},
  price: {type: Number, required: true},
  type: {type: String, required: true, enum: [
    "Decoración",
    "Cocina",
    "Baño",
    "Juguete",
    "Hobbies",
  ],
},
verified : { type: Boolean, required: true, default: false }
}, {
  timestamps: true,
  collection: "artículos",
});

const Article = mongoose.model("artículos", articlesSchema, "artículos");
module.exports = Article;