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

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10), next()}
});

const User = mongoose.model("users", userSchema, "users");

module.exports = User;

// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// // Esquema para el modelo de Usuario
// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: [true, 'El nombre de usuario es obligatorio'],
//     unique: true,
//     trim: true
//   },
//   email: {
//     type: String,
//     required: [true, 'El email es obligatorio'],
//     unique: true,
//     match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, ingresa un email válido']
//   },
//   password: {
//     type: String,
//     required: [true, 'La contraseña es obligatoria'],
//     minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
//   },
//   role: {
//     type: String,
//     enum: ['user', 'admin'],
//     default: 'user'
//   },
//   profile: {
//     firstName: String,
//     lastName: String,
//     bio: String,
//     avatar: String
//   },
//   articles: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Article'
//   }],
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// // Método pre-save para hashear la contraseña antes de guardarla
// userSchema.pre('save', async function(next) {
//   // Solo hashear la contraseña si ha sido modificada (o es nueva)
//   if (!this.isModified('password')) return next();
  
//   try {
//     // Generar un salt
//     const salt = await bcrypt.genSalt(10);
//     // Hashear la contraseña
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // Método para verificar la contraseña
// userSchema.methods.comparePassword = async function(candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// const User = mongoose.model('User', userSchema);

// module.exports = User;