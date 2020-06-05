const path = require('path');

const express = require('express');

const contactsController = require('../controllers/contacts');
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post('/delete-contact/:contactId', isAuth, adminController.deleteContact);

router.post('/update-contact', isAuth, adminController.postUpdatedContact);
router.get('/update-contact/:contactId', isAuth, adminController.getContact);
router.get('/', contactsController.getContact);

module.exports = router;