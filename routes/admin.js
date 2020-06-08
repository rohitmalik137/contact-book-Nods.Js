const path = require('path');

const express = require('express');
const { body } = require('express-validator');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/add-contact', isAuth, adminController.getAddContact);
router.post('/add-contact', [
    body('name')
        .isAlpha()
        .isLength({ min: 3 })
        .trim()
    // body('tel[]')
    //     .isNumeric()
    //     .isLength(10)
    //     .trim()
    // body('email')
    //     .isEmail()
    //     .withMessage('Invalid Email')
    //     .normalizeEmail()
], 
isAuth, 
adminController.postAddContact);

router.delete('/delete-contact/:contactId', isAuth, adminController.deleteContact);

router.get('/add-profile/:contactId', isAuth, adminController.getAddProfile);
router.post('/add-profile', isAuth, adminController.postAddProfile);

router.post('/update-contact', isAuth, adminController.postUpdatedContact);
router.get('/update-contact/:contactId', isAuth, adminController.getUpdateContact);


module.exports = router;