const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/add-contact', adminController.getAddContact);

router.post('/add-contact', adminController.postAddContact);

module.exports = router;