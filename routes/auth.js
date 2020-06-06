const express = require('express');
const { check, body } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);
router.post(
    '/login', 
    [
        check('email')
            .isEmail()
            .withMessage('Invalid Email!!')
            .normalizeEmail(),
        body('password')
            .isLength({ min: 5})
            .isAlphanumeric()
            .trim()
    ],
    authController.postLogin);

router.get('/signup', authController.getSignup);
router.post(
    '/signup', 
    [
        check('email')
            .isEmail()
            .withMessage('Invalid Email')
            .custom((value, {req}) => {
                return User.findOne({email: value})
                    .then(user => {
                    if(user){
                        return Promise.reject('Email already exists! Please try another!');
                    }
                });
            })
            .normalizeEmail(),
        body('password', 'Password must contain only numbers and text and of atleast 5 length')
            .isLength({min: 5})
            .isAlphanumeric()
            .trim(),
        body('confirmPassword')
            .custom((value, {req}) => {
                if(value !== req.body.password){
                    throw new Error('Passwords don\'t match!!');
                }
                return true;
            })
            .trim()
    ], 
    authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);
router.post('/reset', authController.postReset);

router.post('/reset', authController.postReset);
router.get('/reset/:tokenId', authController.getResetPassword);

router.post('/resetpassword', authController.postResetPassword);

module.exports = router;