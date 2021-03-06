const express = require('express');
require('dotenv').config();
const {
	dbConnection,
} = require('./src/DB/config');
const cors = require('cors');

//server express
const app = express();
//Habilitar Pagina
app.use(express.static('public'));

//BD
dbConnection();

//CORS
app.use(cors());

//lectura y parseo body
app.use(express.json());

//hablilar Rutas
app.use(
	'/api/auth',
	require('./src/routers/auth')
);
app.use(
	'/api/events',
	require('./src/routers/eventsRouter')
);

//Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Running on port ${PORT}`);
});
