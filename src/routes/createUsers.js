const express = require('express');
const router = express.Router();
const Usuario = require('../usuario');

//usuariosRouter.js 
//CODER userManager

console.log(Usuario)

router.post('/createUsers', async (req, res) => {
    try {
     const { nombre, apellido, correo, contraseña } = req.body;

     if(!nombre || !correo || !contraseña) {
        return res.status(400).send('Faltan campos obligatorios');

     }

     const nuevoUsuario = new Usuario(nombre, apellido, correo, contraseña); 
     res.status(201).json(nuevoUsuario);
     
    }catch(error) {
        console.error('Error al crear el usuario', error);
        res.status(500).send('Error al crear usuario');
    }
});


module.exports = router;