const { response, request } = require('express');
const {
	validationResult,
} = require('express-validator');

const crearUsuario = (
	req = request,
	res = response
) => {
	const { email, name, password } = req.body;

	//errores
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).send({
			ok: false,
			errors: errors.mapped(),
		});
	}

	res.status(201).send({
		ok: true,
		msg: 'Register',
		name,
		email,
		password,
	});
};

const loginUsuario = (
	req = request,
	res = response
) => {
	const { email, password } = req.body;

	//errores
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).send({
			ok: false,
			errors: errors.mapped(),
		});
	}

	res.send({
		ok: true,
		msg: 'Login',
		email,
		password,
	});
};

const revalidarToken = (
	req = request,
	res = response
) => {
	res.send({ ok: true, msg: 'Login' });
};

module.exports = {
	crearUsuario,
	loginUsuario,
	revalidarToken,
};
