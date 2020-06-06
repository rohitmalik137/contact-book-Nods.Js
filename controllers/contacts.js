const Contact = require('../models/contact');

exports.getContact = (req, res, next) => {
    // console.log('hey there!');
    Contact.find({userId: req.user._id})
    .then(contacts => {
        res.render('show-contacts', {
            pageTitle: 'My Contacts',
            contacts: contacts,
            path: '/my-contacts',
            count: contacts.length
        });
    })
    .catch(err => {
        console.log(err);
    });
};

exports.homePage = (req, res, next) => {
    res.render('home-page', {
        pageTitle: 'Contact Book',
        path: '/'
    });
}