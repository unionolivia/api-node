const config = require('../../configs/config.json');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const connection = mongoose.connect(config.uri,
     {
       useNewUrlParser: true
     }).then(() => {
      console.log('Successfully connected to the database');
    }).catch(err => {
      console.log('Could not connect to the database');
      process.exit();
    });

  module.exports = {
    connection: connection
  };
