const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/UsuarioModel');
const {
	UserException,
} = require('../Exceptions/UserException');
const { generarJWT } = require('../helpers/JWT');

const crearUsuario = async (
	req = request,
	res = response
) => {
	let newUser;
	try {
		const userExist = await findUserByEmail(
			req.body
		);
		if (userExist) {
			return res.status(500).send({
				ok: false,
				error: 'Este usuario ya existe en bd',
			});
		}
		const usuario = new Usuario(req.body);
		const userForBd = encriptarPass(usuario);
		newUser = await userForBd.save();
		//JWT token
		const token = await generarJWT(
			newUser.id,
			usuario.name
		);
		res
			.status(200)
			.send({ ok: true, user: newUser, token });
	} catch (error) {
		return res.status(500).send({
			ok: false,
			error: 'Error al crear el usuario',
		});
	}
};

const loginUsuario = async (
	req = request,
	res = response
) => {
	try {
		const userExist = await findUserByEmail(
			req.body
		);
		if (!userExist) {
			return res.status(500).send({
				ok: false,
				error: 'Este usuario no existe',
			});
		}
		const passwordIsValid = validarPassword(
			req.body.password,
			userExist.password
		);
		if (!passwordIsValid) {
			return res.status(500).send({
				ok: false,
				error: 'usuario o contraseña errada',
			});
		}
		const token = await generarJWT(
			userExist.id,
			userExist.name
		);
		return res.send({
			ok: true,
			user: {
				uid: userExist.id,
				name: userExist.name,
			},
			token,
		});
	} catch (error) {
		return res.status(500).send({
			ok: false,
			error: 'Error en login',
		});
	}
};

const revalidarToken = async (
	req = request,
	res = response
) => {
	const uid = req.uid;
	const name = req.name;
	//JWT
	const token = await generarJWT(uid, name);
	res.send({ ok: true, uid, name, token });
};

const validarPassword = (
	passwordIn,
	paswordBD
) => {
	return bcryptjs.compareSync(
		passwordIn,
		paswordBD
	);
};

const findUserByEmail = async ({ email }) => {
	let user = await Usuario.findOne({ email });
	return user;
};

const encriptarPass = (usuario) => {
	const salt = bcryptjs.genSaltSync();
	usuario.password = bcryptjs.hashSync(
		usuario.password,
		salt
	);
	return usuario;
};

module.exports = {
	crearUsuario,
	loginUsuario,
	revalidarToken,
};
