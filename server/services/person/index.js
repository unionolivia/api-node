const config = require('../../../configs/config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../helpers/db.js');
const Person = require('../../models/person.js');

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function authenticate({email, password}){
  const person = await Person.findOne({email});
  if (person && bcrypt.compareSync(password, person.hash)) {
    const {hash, ...userWithoutHash } = person.toObject();
    const token = jwt.sign({ sub: person.id }, config.secret);
    return {
      ...userWithoutHash,
      token
    };
  }
}

async function getAll() {
  return await Person.find().select('-hash');
}

async function getById(id) {
  return await Person.findById(id).select('-hash');
}

async function create(personData) {
  // Let's validate
  if(await Person.findOne({email: personData.email})){
    throw 'email "' + personData.email + '" is already taken';
  }

  const person = new Person(personData);

  // Let's hash the password from the form
  if(personData.password) {
    person.hash = bcrypt.hashSync(personData.password, 10);
  }
  // Let's save the person's details
  await person.save();
}

async function update(id, personData) {
  const person = await User.findById(id);

  // let's validate
  if(!person) throw 'User not found';

  if( person.email !== personData.email && await Person.findOne({ email: personData.email })){
    throw 'email "' + personData.email + '" is already taken';
  }
  // Hash password if it was entered
  if(personData.password){
    personData.hash = bcrypt.hashSync(personData.password, 10);
  }

  // Copy personData properties to person
  Object.assign(person, personData);

  await person.save();
}

async function _delete(id) {
  await Person.findByIdAndRemove(id);
}
