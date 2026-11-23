/**
 * Define aquí la base de datos y las colecciones que muestra la web.
 * Debe coincidir con seed/01-init.js (donde se crea la base en Mongo).
 *
 * Tipos de campo: string | number | boolean | date | select (con options) | textarea
 * Opciones: name, label, type, required, min, options,
 *           filter: true  -> en campos number agrega filtros "mayor que" / "menor que"
 *                            (los campos select siempre tienen filtro de igualdad)
 */
const CATEGORIAS = ['computadores', 'periferico', 'monitor', 'audio', 'almacenamiento'];

module.exports = {
  database: process.env.DB_NAME || 'tecnomarket',
  title: 'Tecnomarket — Panel de inventario',
  collections: [
    {
      name: 'productos',
      label: 'Productos',
      fields: [
        { name: 'nombre',      label: 'Nombre',      type: 'string',   required: true },
        { name: 'categoria',   label: 'Categoría',   type: 'select',   required: true, options: CATEGORIAS },
        { name: 'marca',       label: 'Marca',       type: 'string' },
        { name: 'precio',      label: 'Precio (CLP)', type: 'number',  required: true, min: 0, filter: true },
        { name: 'stock',       label: 'Stock',       type: 'number',   required: true, min: 0, filter: true },
        { name: 'descripcion', label: 'Descripción', type: 'textarea' }
      ]
    },
    {
      name: 'clientes',
      label: 'Clientes',
      fields: [
        { name: 'nombre',        label: 'Nombre',         type: 'string', required: true },
        { name: 'email',         label: 'Correo',         type: 'string', required: true },
        { name: 'telefono',      label: 'Teléfono',       type: 'string' },
        { name: 'ciudad',        label: 'Ciudad',         type: 'select',
          options: ['Santiago', 'Valparaíso', 'Concepción', 'La Serena', 'Temuco', 'Otra'] },
        { name: 'fechaRegistro', label: 'Fecha registro', type: 'date', required: true },
        { name: 'activo',        label: 'Cliente activo', type: 'boolean' }
      ]
    }
  ]
};
