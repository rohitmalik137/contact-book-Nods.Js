const path = require('path');

const express = require('express');

const contactsController = require('../controllers/contacts');
const adminController = require('../controllers/admin');

const router = express.Router();

router.post('/delete-contact/:contactId', adminController.deleteContact);

router.post('/update-contact', adminController.postUpdatedContact)
router.get('/update-contact/:contactId', adminController.getContact);
router.get('/', contactsController.getContact);

module.exports = router;