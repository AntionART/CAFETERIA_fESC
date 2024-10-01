const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Ruta para mostrar la página principal y los productos
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.sendFile(path.join(__dirname, '../public/index.html'));  // Muestra el HTML
    } catch (err) {
        res.status(500).send('Error al obtener los productos');
    }
});

// Ruta para agregar productos
router.post('/add-product', async (req, res) => {
    const { nombre, descripcion, precio, stock, categoria } = req.body;
    const newProduct = new Product({ nombre, descripcion, precio, stock, categoria });
    try {
        await newProduct.save();
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error al agregar el producto');
    }
});

// Ruta para eliminar productos
router.post('/delete-product/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        await Product.findByIdAndDelete(productId);
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error al eliminar el producto');
    }
});

module.exports = router;
