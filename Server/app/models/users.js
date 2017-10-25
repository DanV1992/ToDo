var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;



var UserSchema = new Schema({
    //user: {type:Schema.Types.ObjectId, Required: true},
    firstName:{type:String, required:true},
    lastName: {type: String, required:true},
    status: {type: Boolean, default:true},
    email: {type: String, required, unique: true},
    password: {type: String},
    dateRegistered: {type: Date, default: Date.now}
});

module.exports = Mongoose.model('User', UserSchema);