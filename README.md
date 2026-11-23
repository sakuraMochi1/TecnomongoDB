# CRUD web con MongoDB (Express + Docker)

## Levantar todo (Mongo + web) con Docker
```
docker compose up -d --build
```
- Web: http://localhost:3000
- MongoDB desde tu PC / Compass: `mongodb://localhost:27018`
- Ver logs: `docker compose logs -f app`
- Apagar: `docker compose down`  (agrega `-v` para borrar también los datos)

## Cómo se define la base de datos
- **`seed/01-init.js`** crea la base, las colecciones (con validación de esquema), el índice único de correo y los datos de ejemplo. Se ejecuta solo la primera vez.
- **`src/config.js`** le dice a la web qué colecciones y campos mostrar. Debe coincidir con el seed.
- **`docs/consultas.js`** contiene las consultas para el documento de evidencias.

Para adaptarlo a otro caso: cambia ambos archivos y ejecuta
`docker compose down -v && docker compose up -d --build`.

## Ejecutar sin Docker para la app (solo Mongo en Docker)
```
docker compose up -d mongo
npm install
node src/server.js
```
Para Mongo local usa `MONGO_URI=mongodb://localhost:27017`.

## API
| Método | Ruta | Acción |
|---|---|---|
| GET | /api/:coleccion?q=texto&f_campo=valor&gt_campo=10&lt_campo=50 | Read (búsqueda y filtros) |
| POST | /api/:coleccion | Create |
| PUT | /api/:coleccion/:id | Update |
| DELETE | /api/:coleccion/:id | Delete |
