const express = require('express');
const router = express.Router();

const IndexController = require('../controllers/index.js');

router.get('/', IndexController.indexGet);

module.exports = router;