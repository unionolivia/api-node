const express = require('express');
const personService = require('../../../services/person');

let router = express.Router();

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function authenticate(req, res, next) {
  personService.authenticate(req.body)
  .then( person => person ? res.json(person) : res.status(400).json( { message: 'Username or password is incorrect'}))
  .catch(err => next(err));
}

function register(req, res, next) {
  personService.create(req.body)
  .then(() => res.json({}))
  .catch(err => next(err));
}

function getAll(req, res, next) {
  personService.getAll()
  .then(persons => res.json(persons))
  .catch(err => next(err));
}

function getCurrent(req, res, next) {
  personService.getById(req.person.sub)
  .then(person => person ? res.json(person) : res.sendStatus(404))
  .catch(err => next(err));
}
function getById(req, res, next) {
  personService.getById(req.params.id)
  .then(person => person ? res.json(person) : res.sendStatus(404))
  .catch(err => next(err));
}

function update(req, res, next) {
  personService.update(req.params.id, req.body)
  .then(() => res.json({}))
  .catch(err => next(err));
}

function _delete(req, res, next){
  personService._delete(req.params.id)
  .then(() => res.json({}))
  .catch(err => next(err));
}
