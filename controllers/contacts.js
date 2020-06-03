const Contact = require('../models/contact');

exports.getContact = (req, res, next) => {
    Contact.fetchAll((contacts) => {
        // console.log(contacts.length);
        res.render('show-contacts', {
            pageTitle: 'Show Contacts',
            contacts: contacts,
            path: '/',
            count: contacts.length
        });
    });
};