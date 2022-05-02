const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({

});

  // create the Thought model using the ThoughtSchema
  const Thought = model('Thought', ThoughtSchema);

  // export the Thought model
  module.exports = Thought;