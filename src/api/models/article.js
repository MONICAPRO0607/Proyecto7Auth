const mongoose = require("mongoose");

const articlesSchema = new mongoose.Schema({
  name: {type: String, required: true},
  vendor: { type: String, ref: 'user' },
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
  collection: "article",
});

const Article = mongoose.model("article", articlesSchema, "article");
module.exports = Article;