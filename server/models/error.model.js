const mongoose = require('mongoose');

const ErrorSchema = new mongoose.Schema({
    _error: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

const ErrorModel = mongoose.model('Error', ErrorSchema);

module.exports = ErrorModel;