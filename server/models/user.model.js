const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {type: String, required:true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profileImg: {type: String},
    createdAt: {type: Date, default: Date.now},
    isValid: {type: Boolean, default: false},
    uniqueString: {type: String, required: true},
    setError: {type: Number, default: 0},
    setSuccess: {type: Number, default: 0},
    accrole: {type: String, default: "user"}

},
{collection: 'user-data'})

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;