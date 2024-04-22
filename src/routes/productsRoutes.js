
const express = require('express');
const routes = express.Router();
const fs = require('fs');
//import { readFile } from 'node:fs';

//este archivo obtiene los productos del productos.json

router.get('/productos', async (req, res) => {
    try {
        const data = await readFileAsync('../src/data/productos.json', 'utf8')
        const productos = JSON.parse(data);
        res.json(productos);

    }catch(error) {
        console.error('Error al leer el archivo Productos.json', error)
        res.status(500).send('Error al obtener productos'); 

}
});

module.exports = router;
