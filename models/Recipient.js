const mongoose = require('mongoose');
// require('mongoose-type-email');

const schema = mongoose.Schema({
	// email: mongoose.SchemaTypes.Email,
	email: String,
	responded: {
		type: Boolean,
		default: false
	}
});

module.exports = schema;