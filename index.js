const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./DB/config');

//server express
const app = express();
//Habilitar Pagina
app.use(express.static('public'));

//BD
dbConnection();

//lectura y parseo body
app.use(express.json());

//hablilar Rutas
app.use('/api/auth', require('./routers/auth'));

//Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Running on port ${PORT}`);
});
