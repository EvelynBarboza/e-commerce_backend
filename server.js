const express = require('express');
const moment = require('moment');
const app = express();
const bodyParser = require('body-parser');


const createUsers = require('./src/routes/createUsers');
const productsRoutes = require('./src/routes/productsRoutes');
const cartsRoutes = require('./src/routes/cartsRoutes');

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/usuarios', createUsers);

app.use('/api/productos', productsRoutes);

app.use('api/carts', cartsRoutes);

app.post('/createUsers', (req, res) => {

    const {nombre, apellido, correo, contraseña } = req.body;

    const nuevoUsuario = new Usuario(nombre, apellido, correo, contraseña);

    res.send ('Usuario creado con exito');
});

app.listen(8080, () => {
    console.log('Servidor escuchando en el puerto 8080');
});
