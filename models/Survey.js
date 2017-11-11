const mongoose = require('mongoose');
const Recipient = require('./Recipient');

const schema = mongoose.Schema({
	title: String,
	body: String,
	subject: String,
	recipients: [Recipient],
	yes: { type: Number, default: 0},
	no: { type: Number, default: 0},
	_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	dateSent: Date,
	lastResponded: Date
});

module.exports = mongoose.model('surveys', schema);