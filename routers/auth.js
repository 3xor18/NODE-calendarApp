const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const {
	crearUsuario,
	loginUsuario,
	revalidarToken,
} = require('../controllers/authController');
const {
	validarCampos,
} = require('../middlewares/validar-campos');
const {
	validarJWT,
} = require('../middlewares/validar-jwt');

router.post(
	'/new',
	[
		check('name', 'Nombre Obligatorio')
			.not()
			.isEmpty(),
		check('email', 'Email invalido').isEmail(),
		check(
			'password',
			'Password debe de ser >6'
		).isLength({ min: 6 }),
		validarCampos,
	],
	crearUsuario
);

router.post(
	'/',
	[
		check('email', 'Email invalido').isEmail(),
		check(
			'password',
			'Password debe de ser >6'
		).isLength({ min: 6 }),
		validarCampos,
	],
	loginUsuario
);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;
