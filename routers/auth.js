const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const {
	crearUsuario,
	loginUsuario,
	revalidarToken,
} = require('../controllers/authController');

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
	],
	loginUsuario
);

router.get('/renew', revalidarToken);

module.exports = router;
