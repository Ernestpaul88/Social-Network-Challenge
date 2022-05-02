const { Schema, model } = require('mongoose');

const UserSchema = new Schema({

});

  // create the User model using the UserSchema
  const User = model('User', UserSchema);

  // export the User model
  module.exports = User;