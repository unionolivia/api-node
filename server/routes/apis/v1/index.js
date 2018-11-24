'use strict';

const
    express = require('express'),
    personController = require('../../../controllers/apis/person');

let router = express.Router();

router.use('/person', personController);

module.exports = router;
