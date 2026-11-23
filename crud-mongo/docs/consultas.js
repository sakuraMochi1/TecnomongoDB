// Ejecutar:  docker exec -it mongo-docker mongosh

use("tecnomarket")

// CREATE 
db.productos.insertOne({ nombre: "", categoria: "", marca: "", precio: 1, stock: 1, descripcion: "" })

// READ 
db.productos.find()                                          
db.clientes.find()
db.productos.find({ categoria: "" })              

// UPDATE 
db.productos.updateOne({ nombre: "" }, { $set: { stock: 1, precio: 1 } })

// DELETE 
db.productos.deleteOne({ nombre: "" })



