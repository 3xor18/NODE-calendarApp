function UserException(msg) {
	return {
		code: 400,
		msg,
	};
}

module.exports = { UserException };
