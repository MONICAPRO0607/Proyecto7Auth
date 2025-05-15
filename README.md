# Proyecto7Auth

1. Servidor con express:
Realizado con éxito.

2. Conexión a una base de datos de Mongo Atlas mediante mongoose:
Realizado con éxito.

3. Creación de tres modelos, uno de ellos el de users:
Realizado con éxito.

4. Una semilla que suba datos a una de las colecciones:
Realizado con éxito: 
Se ha creado una semilla de datos, que están en data/article.js. 
Se ha creado un método en controllers/aricle.js que llama a la función launchSeed. 

5. Dos relaciones entre colecciones, la idea es que los usuarios tengan un dato relacionado también.
Realizado.

6. CRUD completo de todas las colecciones. Realizados:
Endpoints: 
- users: 
  -- usersRoutes.get("/", getSellers);  --> obtiene todos los usuarios
  -- usersRoutes.post("/register", register);  --> se crea un nuevo usuario
  -- usersRoutes.post("/login", login);  --> realiza login de un usuario
  -- usersRoutes.put('/:id, updateUser); --> actualiza al usuario localizándolo por id
  -- usersRoutes.delete("/:id", deleteUser);  --> elimina un usuario por su id
- article:  
  -- articleRoutes.get("/", getArticle);  --> obtiene todos los artículos
  -- articleRoutes.post("/", postArticle);  --> crea un nuevo artículo
  -- articleRoutes.get("/:vendor", getArticle); --> obtiene el artículo por vendedor.
  -- articleRoutes.get("/getArticleByPrice/:price", getArticleByPrice);  --> obtiene el artículo filtrando por precio
  -- articleRoutes.put("/:id", isAuth, updateArticle); --> encuentra el artículo.
  -- articleRoutes.delete("/:id", [isAuth, isAdmin], deleteArticle); --> elimina el artículo.
  -- articleRoutes.get("/seed", chargeSeed);  --> sube una semilla de datos a la colección de artículos en la BBDD
- customers: 
  -- customersRoutes.get("/", getCustomers);  --> obtiene todos los clientes
  -- customersRoutes.post("/register", register);  --> crea un nuevo cliente
  -- customersRoutes.post("/login", login);  --> realiza login de un cliente
  -- customersRoutes.delete("/:id", deleteCustomers);  --> elimina un cliente por su id

7. 2 roles de usuario con diferentes permisos
Los 2 roles de usuarios están creados y configurados.

8. Los usuarios sólo pueden ser creados con rol user. Realizado.


9. Crearemos nuestro primer admin cambiando su rol directamente en la BBDD. Realizado.


10. Los admins pueden modificar a un usuario normal para cambiar su rol y hacerlo admin también. Realizado.


11. Los admins pueden eliminar usuarios, pero un usuario se puede eliminar a si mismo. Realizado.


12. Existe un middleware que compruebe el token que se aporta en la petición para dejar pasar o mostrar un mensaje de error. Realizado.

API RESTful desarrollada con Node.js, Express y MongoDB Atlas, con autenticación JWT y diferentes roles de usuario.

## Características

- ✅ Arquitectura MVC (Modelo-Vista-Controlador)
- ✅ Autenticación con JWT (JSON Web Tokens)
- ✅ Roles de usuario (user, admin) con diferentes permisos
- ✅ CRUD completo para usuarios, artículos y clientes
- ✅ Validación de datos
- ✅ Relaciones entre colecciones
- ✅ Seeds para cargar datos de prueba

## Estructura del Proyecto

```
├── config/             # Configuración de la BD
├── controllers/        # Controladores de la API
├── data/               # Datos de ejemplo para las seeds
├── middlewares/        # Middlewares (auth, etc.)
├── models/             # Modelos de Mongoose
├── routes/             # Rutas de la API
├── seeds/              # Scripts para cargar datos iniciales
├── .env                # Variables de entorno
├── server.js           # Punto de entrada de la aplicación
└── README.md           # Documentación
```

## Modelos

### Usuario (User)
- username: String 
- password: String (hasheada)
- role: String ('user' o 'admin')
- articles: Array (artículos escritos por el usuario)

### Artículo (Article)
- name: String
- vendor: String
- img: String
- price: Number
- type: String

### Cliente (Customer)
- customerName: String
- password: String (hasheada)
- rol: String
- articles: String




## Roles y Permisos

- **user**: Permisos básicos (crear/editar/eliminar sus propios recursos)
- **admin**: Permisos completos (gestión de todos los recursos y usuarios)
- **customer**: Permisos para darse de alta, encontrarse y darse de baja.

## Endpoints

### Usuarios

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | usersRoutes.get('/', getUsers); | Obtener usuarios
| POST | usersRoutes.post('/register', register); | Registrarse usuarios
| POST | usersRoutes.post('/login', login); | Logearse usuario
| PUT | usersRoutes.put('/:id', isAuth, updateUser); | Modificar usuario
| DELETE | usersRoutes.delete('/:id', [isAuth, isAdmin], deleteUser); | Eliminar usuario
| PUT | usersRoutes.put("/change-role/:id", isAuth, changeRole);| Cambiar rol usuario

### Artículos

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | articleRoutes.get('/', getArticles) | Obtener artículos
| GET | articleRoutes.get('/:vendor', getArticleByVendor) | Obtener artículos por vendedor
| GET | articleRoutes.get('/getArticleByPrice/:price', getArticleByPrice) | Obtener artículos por precio 
| POST | articleRoutes.post('/', isAuth, createArticle) | Crear artículos
| PUT | articleRoutes.put('/:id', isAuth, updateArticle) | Modificar artículos
| DELETE | articleRoutes.delete('/:id', [isAuth, isAdmin], deleteArticle) | Eliminar artículos


### Clientes

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | customersRoutes.get("/", [isAuth, isAdmin], getCustomers); | Obtener clientes.
| POST | customersRoutes.post("/createCustomer", [isAuth, isCustomer], createCustomer); | Crear clientes.
| POST | customersRoutes.post("/login", isCustomer, login); | Loguear clientes.
| PUT | customersRoutes.put("/updateCustomer", [isAuth, isCustomer], updateCustomer); | Modificar clientes.
| DELETE | customersRoutes.delete("/:id", [isAuth, isCustomer], deleteCustomer); | Eliminar clientes.




## Tecnologías Utilizadas

- **Express**: Framework web para Node.js
- **Mongoose**: ODM para MongoDB
- **JWT**: Autenticación mediante tokens
- **bcrypt**: Encriptación de contraseñas
- **dotenv**: Variables de entorno
