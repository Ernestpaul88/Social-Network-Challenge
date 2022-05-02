const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');
const uniqueValidator = require('mongoose-unique-validator');


const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },

  email: {
    type: String,
    validate:{
      validator: function(v){
        return isEmail(v);
      },
      message:  props => `${props.value} is not a valid email!` 
    },
    required: true,
    unique: true
  },

  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],

  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
},
{
  toJSON: {
    virtuals: true
  },
  id: false
}
);

// get total count of friends retrieval
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// Apply the uniqueValidator plugin to userSchema.
UserSchema.plugin(uniqueValidator);

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;