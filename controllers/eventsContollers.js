const { response, request } = require('express');
const Evento = require('../models/EventoModel');

const getEventos = async (
	req,
	res = response
) => {
	const eventos = await Evento.find().populate(
		'user',
		'name'
	);
	res.send({ ok: true, eventos });
};

const crearEvento = async (
	req,
	res = response
) => {
	try {
		const evento = new Evento(req.body);
		evento.user = req.uid;
		const saved = await evento.save();
		res.send({
			ok: true,
			event: saved,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			ok: false,
			msg: 'Error al crear el evento',
		});
	}
};

const actualizarEvento = async (
	req,
	res = response
) => {
	const eventoId = req.params.id;
	const uid = req.uid;
	let eventCreated;
	try {
		const evento = await Evento.findById(
			eventoId
		);
		if (!evento) {
			return res.status(404).send({
				ok: false,
				msg: 'Evento no existe en bd',
			});
		}
		if (evento.user.toString() !== uid) {
			return res.status(401).send({
				ok: false,
				msg: 'No estas autorizado',
			});
		}
		const newEvento = { ...req.body, user: uid };
		eventCreated = await Evento.findByIdAndUpdate(
			eventoId,
			newEvento,
			{ new: true }
		);
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			ok: false,
			msg: 'Error al actualizar el evento',
		});
	}
	res.send({
		ok: true,
		id: eventoId,
		eventCreated,
	});
};

const eliminarEvento = async (
	req,
	res = response
) => {
	const eventoId = req.params.id;
	const uid = req.uid;
	try {
		const evento = await Evento.findById(
			eventoId
		);
		if (!evento) {
			return res.status(404).send({
				ok: false,
				msg: 'Evento no existe en bd',
			});
		}
		if (evento.user.toString() !== uid) {
			return res.status(401).send({
				ok: false,
				msg: 'No estas autorizado',
			});
		}
		await Evento.findByIdAndDelete(eventoId);
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			ok: false,
			msg: 'Error al eliminar el evento',
		});
	}
	res.status(200).send({
		ok: true,
		msn: 'Evento eliminado',
	});
};
module.exports = {
	getEventos,
	crearEvento,
	actualizarEvento,
	eliminarEvento,
};
