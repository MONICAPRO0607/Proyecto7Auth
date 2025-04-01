# Proyecto7Auth

1. Servidor con express
Realizado con éxito

2. Conexión a una base de datos de Mongo Atlas mediante mongoose
Realizado con éxito

3. Creación de tres modelos, uno de ellos el de users
Realizado con éxito, cambiando "users" por "customers".

4. Una semilla que suba datos a una de las colecciones
Realizado con éxito: 
Se ha creado una semilla de datos, que están en data/article.js. 
Se ha creado un método en controllers/aricle.js que llama a la función launchSeed. 

5. Dos relaciones entre colecciones, la idea es que los usuarios tengan un dato relacionado también.

6. CRUD completo de todas las colecciones
Endpoints: 
- seller: 
  -- sellersRoutes.get("/", getSellers);  --> obtiene todos los sellers
  -- sellersRoutes.post("/register", register);  --> se crea un nuevo seller
  -- sellersRoutes.post("/login", login);  --> realiza login de un seller
  -- sellersRoutes.delete("/:id", deleteSellers);  --> elimina un seller por su id
- article:  
  -- articleRoutes.post("/", postArticle);  --> crea un nuevo artículo
  -- articleRoutes.get("/", getArticle);  --> obtiene todos los artículos
  -- articleRoutes.get("/getArticleByPrice/:price", getArticleByPrice);  --> obtiene el artículo filtrando por precio
  -- updateArticle
  -- deleteArticle ()
  -- articleRoutes.get("/seed", chargeSeed);  --> sube una semilla de datos a la colección de artículos en la BBDD
- customers: PENDIENTE DE ARREGLAR LOS PERMISOS DE ADMIN Y AUTH
  -- customersRoutes.get("/", getCustomers);  --> obtiene todos los clientes
  -- customersRoutes.post("/register", register);  --> crea un nuevo cliente
  -- customersRoutes.post("/login", login);  --> realiza login de un cliente
  -- customersRoutes.delete("/:id", deleteCustomers);  --> elimina un cliente por su id

7. 2 roles de usuario con diferentes permisos
Los 2 roles de usuarios están creados y configurados pero no funcionan debido a que no se genera correctamente un token: AYUDA!!!

8. Los usuarios sólo pueden ser creados con rol user
No se ha podido realizar comprobación por fallos en el uso de jwt.

9. Crearemos nuestro primer admin cambiando su rol directamente en la BBDD
No se ha podido realizar comprobación por fallos en el uso de jwt.

10. Los admins pueden modificar a un usuario normal para cambiar su rol y hacerlo admin también
No se ha podido realizar comprobación por fallos en el uso de jwt.

11. Los admins pueden eliminar usuarios, pero un usuario se puede eliminar a si mismo
No se ha podido realizar comprobación por fallos en el uso de jwt.

12. Existe un middleware que compruebe el token que se aporta en la petición para dejar pasar o mostrar un mensaje de error
Realizado: pendiente de solucionar los fallos que ocasiona.
