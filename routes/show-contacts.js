const path = require('path');

const express = require('express');

const contactsController = require('../controllers/contacts');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/update-contact/:contactId', adminController.getContact);
router.get('/', contactsController.getContact);

module.exports = router;