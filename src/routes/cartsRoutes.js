import express from 'express';
import fs from 'fs/promises';

const express = require('express');
const router = express.Router();

const CARTS_FILE_PATH = './data/carts.json';

//para agregar un producto al carrito
router.post('/agregar', async (req, res) => {
    try{
        const data = await fs.readFile(CARTS_FILE_PATH, 'utf8')
        const carts = JSON.parse(data);

        const newCart = {
            id: generateCartId(),
            products: []
        };
        carts.push(newCart);
        await fs.writeFile(CARTS_FILE_PATH, JSON.stringify(carts, null, 2));
        res.status(201).json(newCart);

    }catch (error) {
        res.status(500).json({error: 'Error al crear un nuevo carrito'})
    }
});

//para ver el contenido del carrito
router.get('/:cid', async (req, res) => {
    try{
        const cartId = req.params.cid;
        const data = await fs.readFile(CARTS_FILE_PATH, 'utf8');
        const carts = JSON.parse(data);
        const cart = carts.find( cart => cart.id == cartId);

        if (!cart) {
            return res.status(404).json({error: 'No existe el producto'})
        }
        res.json(cart.products);

    } catch (error) {
        res.status(500).send('Error al obtener productos');
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const data = await fs.readFile(CARTS_FILE_PATH, 'utf8');
        const carts = JSON.parse(data);

        const cartIndex = carts.findIndex(cart => cart.od == cartId);

        if (cartIndex === -1) {
            return res.status(404).json({ error: 'No existe el carrito'});
        }
        const productIndex = carts[cartIndex].products.findIndex(product => product.id == productId );

        if(productIndex === -1) {
            //si el producto no esta en el carrito se agrega
            carts[cartsIndex].products.push({
                id: productId,
                quantity: 1
            });

        } else  {
            //si el producto ya esta en el carrito aumenta la cantidad
            carts[cartIndex].products[productIndex].quantity++;
        }

        await fs.writeFile(CARTS_FILE_PATH, JSON.stringify(carts, null, 2))

    } catch (error) {
        res.status(500).json({error: 'No es posible '});
    }
})

//funcion para crear el ID del carrito unico
function generateCartId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}


export default router;