const { Router } = require('express');
//inicia la funcion
const router = Router();
const {
	validarJWT,
} = require('../middlewares/validar-jwt');
const {
	getEventos,
	crearEvento,
	actualizarEvento,
	eliminarEvento,
} = require('../controllers/eventsContollers');
const { check } = require('express-validator');
const {
	validarCampos,
} = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

//para ocuparlos en todos los enpoints
router.use(validarJWT);

router.get('/', getEventos);

router.post(
	'/',
	[
		check('title', 'Titulo es requerido')
			.not()
			.isEmpty(),
		check('start', 'Start is required').custom(
			isDate
		),
		check('end', 'End is required').custom(
			isDate
		),
		validarCampos,
	],
	crearEvento
);

router.put('/:id', actualizarEvento);

router.delete('/:id', eliminarEvento);

module.exports = router;
