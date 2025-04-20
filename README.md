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
- username: String (único)
- email: String (único)
- password: String (hasheada)
- role: String ('user' o 'admin')
- profile: Object (información del perfil)
- articles: Array (artículos escritos por el usuario)
- createdAt: Date

### Artículo (Article)
- title: String
- content: String
- author: ObjectId (referencia a User)
- tags: Array de String
- published: Boolean
- createdAt: Date
- updatedAt: Date

### Cliente (Customer)
- name: String
- email: String (único)
- phone: String
- address: Object
- createdBy: ObjectId (referencia a User)
- createdAt: Date
- updatedAt: Date

## Requisitos

- Node.js
- npm 
- MongoDB Atlas (o MongoDB local)



## Roles y Permisos

- **user**: Permisos básicos (crear/editar/eliminar sus propios recursos)
- **admin**: Permisos completos (gestión de todos los recursos y usuarios)

## Endpoints

### Usuarios

| Método | Ruta | Descripción | Acceso |
|--------|------|-------------|--------|
| POST | /api/users/register | Registrar nuevo usuario | Público |
| POST | /api/users/login | Iniciar sesión | Público |
| GET | /api/users/profile | Obtener perfil propio | Privado |
| PUT | /api/users/profile | Actualizar perfil propio | Privado |
| GET | /api/users | Obtener todos los usuarios | Admin |
| GET | /api/users/:id | Obtener usuario por ID | Admin |
| PUT | /api/users/:id/role | Actualizar rol de usuario | Admin |
| DELETE | /api/users/:id | Eliminar usuario | Privado/Admin |

### Artículos

| Método | Ruta | Descripción | Acceso |
|--------|------|-------------|--------|
| POST | /api/articles | Crear artículo | Privado |
| GET | /api/articles | Obtener todos los artículos | Público/Filtrado |
| GET | /api/articles/:id | Obtener artículo por ID | Público/Filtrado |
| PUT | /api/articles/:id | Actualizar artículo | Privado/Owner |
| DELETE | /api/articles/:id | Eliminar artículo | Privado/Owner |
| GET | /api/articles/user/:userId | Obtener artículos por usuario | Público/Filtrado |

### Clientes

| Método | Ruta | Descripción | Acceso |
|--------|------|-------------|--------|
| POST | /api/customers | Crear cliente | Privado |
| GET | /api/customers | Obtener todos los clientes | Privado/Filtrado |
| GET | /api/customers/:id | Obtener cliente por ID | Privado/Owner |
| PUT | /api/customers/:id | Actualizar cliente | Privado/Owner |
| DELETE | /api/customers/:id | Eliminar cliente | Privado/Owner |

## Notas

- Los usuarios solo pueden ser creados con rol 'user'
- Los administradores pueden cambiar el rol de un usuario
- Los usuarios pueden ver/editar/eliminar solo sus propios recursos
- Los administradores pueden ver/editar/eliminar todos los recursos
- Los artículos pueden ser publicados o no publicados

## Tecnologías Utilizadas

- **Express**: Framework web para Node.js
- **Mongoose**: ODM para MongoDB
- **JWT**: Autenticación mediante tokens
- **bcrypt**: Encriptación de contraseñas
- **dotenv**: Variables de entorno
