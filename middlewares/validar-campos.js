const { request, response } = require('express');
const {
	validationResult,
} = require('express-validator');

const validarCampos = (
	req = request,
	res = response,
	next
) => {
	//errores
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).send({
			ok: false,
			errors: errors.mapped(),
		});
	}

	next();
};

module.exports = { validarCampos };
