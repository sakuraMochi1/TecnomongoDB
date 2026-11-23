# TECNOMARKET | CRUD web con MongoDB 

## Levantar todo (Mongo + web) con Docker
```
docker compose up -d --build
```
- Web: pegar en el navegador **http://localhost:3000**

## Cómo se define la base de datos
- **`seed/01-init.js`** crea la base, las colecciones (con validación de esquema), el índice único de correo y los datos de ejemplo. Se ejecuta solo la primera vez.
- **`docs/consultas.js`** contiene las consultas necesarias para modificar la baase de datos desde la terminal.

Luego de levantar el servicio desde la terminal (cmd o powershell) debes ejecutar:
```
docker exec -it mongo-docker mongosh
use tecnomarket
```
Despues de conectarte desde la terminal, vease **`docs/consultas.js`**

Todos los cambios realizados seran visibles desde la web y viceversa.

## Ejecutar sin Docker para la app (solo Mongo en Docker)
```
docker compose up -d mongo
npm install
node src/server.js
```

