const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 5000;

// Configuración de mongoose
mongoose.connect('mongodb://localhost/mi_base_de_datos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a MongoDB');
}).catch(err => {
    console.error('Error de conexión a MongoDB', err);
});

// Definición del esquema y modelo de Producto
const productoSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    precio: Number,
    stock: Number,
    categoria: String
});

const Producto = mongoose.model('Producto', productoSchema);

// Middleware para parsear el body
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para mostrar la lista de productos
app.get('/api/productos', async (req, res) => {
    try {
        const productos = await Producto.find(); // Recupera los productos
        res.json(productos); // Envía los productos como respuesta JSON
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los productos');
    }
});

// Ruta para agregar un nuevo producto
app.post('/productos', async (req, res) => {
    const nuevoProducto = new Producto({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        stock: req.body.stock,
        categoria: req.body.categoria
    });

    try {
        await nuevoProducto.save();
        res.redirect('/'); // Redirige a la página principal después de guardar
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar el producto');
    }
});

// Ruta para actualizar un producto
app.put('/productos/:id', async (req, res) => {
    try {
        await Producto.findByIdAndUpdate(req.params.id, req.body);
        res.send('Producto actualizado');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el producto');
    }
});

// Ruta para eliminar un producto
app.delete('/productos/:id', async (req, res) => {
    try {
        await Producto.findByIdAndDelete(req.params.id);
        res.send('Producto eliminado');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el producto');
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
