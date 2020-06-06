const path = require('path');

const express = require('express');

const contactsController = require('../controllers/contacts');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/my-contacts', isAuth, contactsController.getContact);


router.get('/', contactsController.homePage);

module.exports = router;