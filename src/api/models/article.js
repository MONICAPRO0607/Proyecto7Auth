const mongoose = require("mongoose");

const articlesSchema = new mongoose.Schema({
  name: {type: String, required: true},
  vendor: {type: String, required: true},
  img: {type: String, required: true},
  price: {type: Number, required: true},
  type: {type: String, required: true, enum: [
    "Decoración",
    "Cocina",
    "Baño",
    "Juguete",
    "Hobbies",
    "Arte en madera",
    "Cerámica",
    "Textiles",
    "Accesorios",
    "Arte en metal",
    "Arte",
    "Muebles"
  ],
},
verified : { type: Boolean, required: true, default: false }
}, {
  timestamps: true,
  collection: "articulos",
});

const Article = mongoose.model("articulos", articlesSchema, "articulos");
module.exports = Article;