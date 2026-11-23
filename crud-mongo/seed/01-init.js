// Se ejecuta automáticamente SOLO la primera vez que se crea el volumen de Mongo.
// Para repetirlo desde cero:  docker compose down -v && docker compose up -d --build
const database = process.env.MONGO_INITDB_DATABASE || 'tecnomarket';
const target = db.getSiblingDB(database);
const existentes = target.getCollectionNames();

// ---------- Colección productos (con validación de esquema) ----------
if (!existentes.includes('productos')) {
  target.createCollection('productos', {
    validator: { $jsonSchema: {
      bsonType: 'object',
      required: ['nombre', 'categoria', 'precio', 'stock'],
      properties: {
        nombre:      { bsonType: 'string' },
        categoria:   { enum: ['computadores', 'periferico', 'monitor', 'audio', 'almacenamiento'] },
        marca:       { bsonType: ['string', 'null'] },
        precio:      { bsonType: 'number', minimum: 0 },
        stock:       { bsonType: 'number', minimum: 0 },
        descripcion: { bsonType: ['string', 'null'] }
      }
    } }
  });
}

// ---------- Colección clientes (validación + correo único) ----------
if (!existentes.includes('clientes')) {
  target.createCollection('clientes', {
    validator: { $jsonSchema: {
      bsonType: 'object',
      required: ['nombre', 'email', 'fechaRegistro'],
      properties: {
        nombre:        { bsonType: 'string' },
        email:         { bsonType: 'string', pattern: '^.+@.+\\..+$' },
        telefono:      { bsonType: ['string', 'null'] },
        ciudad:        { bsonType: ['string', 'null'] },
        fechaRegistro: { bsonType: 'date' },
        activo:        { bsonType: 'bool' }
      }
    } }
  });
  target.clientes.createIndex({ email: 1 }, { unique: true });
}

// ---------- Datos iniciales ----------
if (target.productos.countDocuments() === 0) {
  target.productos.insertMany([
    { nombre: 'Notebook', categoria: 'computadores', marca: 'Lenovo', precio: 700000, stock: 8,
      descripcion: 'Notebook 15" 16GB RAM, 512GB SSD' },
    { nombre: 'Mouse gamer', categoria: 'periferico', marca: 'Logitech', precio: 25000, stock: 25,
      descripcion: 'Mouse óptico 8000 DPI' },
    { nombre: 'Monitor 27', categoria: 'monitor', marca: 'Samsung', precio: 180000, stock: 5,
      descripcion: 'Monitor 27" Full HD 75Hz' },
    { nombre: 'Audífonos Bluetooth', categoria: 'audio', marca: 'JBL', precio: 45000, stock: 12,
      descripcion: 'Audífonos inalámbricos con micrófono' },
    { nombre: 'Webcam HD', categoria: 'periferico', marca: 'Logitech', precio: 35000, stock: 6,
      descripcion: 'Cámara 1080p con micrófono integrado' },
    { nombre: 'Teclado mecánico', categoria: 'periferico', marca: 'Redragon', precio: 40000, stock: 15,
      descripcion: 'Teclado mecánico retroiluminado' },
    { nombre: 'SSD 1TB', categoria: 'almacenamiento', marca: 'Kingston', precio: 65000, stock: 20,
      descripcion: 'Disco sólido NVMe 1TB' },
    { nombre: 'Parlante portátil', categoria: 'audio', marca: 'Sony', precio: 55000, stock: 9,
      descripcion: 'Parlante Bluetooth resistente al agua' }
  ]);
}

if (target.clientes.countDocuments() === 0) {
  target.clientes.insertMany([
    { nombre: 'Camila Rojas',   email: 'camila.rojas@correo.cl',   telefono: '+56911111111', ciudad: 'Santiago',   fechaRegistro: new Date('2026-01-15'), activo: true },
    { nombre: 'Diego Fuentes',  email: 'diego.fuentes@correo.cl',  telefono: '+56922222222', ciudad: 'Valparaíso', fechaRegistro: new Date('2026-02-03'), activo: true },
    { nombre: 'Valentina Soto', email: 'valentina.soto@correo.cl', telefono: null,           ciudad: 'Concepción', fechaRegistro: new Date('2026-03-21'), activo: true },
    { nombre: 'Matías Pérez',   email: 'matias.perez@correo.cl',   telefono: '+56944444444', ciudad: 'Santiago',   fechaRegistro: new Date('2026-04-09'), activo: false }
  ]);
}
print('Base "' + database + '" lista: productos=' + target.productos.countDocuments() +
      ', clientes=' + target.clientes.countDocuments());
