const Contact = require('../models/contact');

exports.getContact = (req, res, next) => {
    Contact.fetchAll((contacts) => {
        res.render('show-contacts', {
            pageTitle: 'Show Contacts',
            contacts: contacts,
            path: '/'
        });
    });
};