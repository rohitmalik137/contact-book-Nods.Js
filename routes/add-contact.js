const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/add-contact', isAuth, adminController.getAddContact);

router.post('/add-contact', isAuth, adminController.postAddContact);

module.exports = router;