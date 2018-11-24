const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  hash: {type: String, required: true},
  createdDate: {type: Date, default: Date.now}
});

// Ensure virtual fields are serialised
personSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Person', personSchema);
