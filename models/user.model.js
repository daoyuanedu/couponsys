/**
 * Created by ekinr on 2016/11/16.
 */
var mongoose = require('mongoose');
var dbConsts = require('./dbConsts');


var userSchema = mongoose.Schema({
  username : { required: true, type: String, unique: true},
  password: { required: true, type: String},
  userType: {type: String, enum: dbConsts.userTypes, uppercase: true}
});

userSchema.index({ username : 1 });
module.exports = mongoose.model('User', userSchema);