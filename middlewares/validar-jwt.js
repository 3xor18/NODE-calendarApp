const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (
	req = request,
	res = response,
	next
) => {
	const token = req.header('x-token');
	if (!token) {
		return res.status(401).send({
			ok: false,
			message: 'No hay token',
		});
	}

	try {
		const { uid, name } = jwt.verify(
			token,
			process.env.SECRET_JWT_SEED
		);
		req.uid = uid;
		req.name = name;
	} catch (error) {
		return res.status(401).send({
			ok: false,
			message: 'Token invalido',
		});
	}

	next();
};

module.exports = { validarJWT };
