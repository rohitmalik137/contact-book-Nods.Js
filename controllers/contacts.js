const Contact = require('../models/contact');

exports.getContact = (req, res, next) => {
    Contact.fetchAll()
    .then(contacts => {
        res.render('show-contacts', {
            pageTitle: 'Show Contacts',
            contacts: contacts,
            path: '/',
            count: contacts.length
        });
    })
    .catch(err => {
        console.log(err);
    });
    
    // Contact.fetchAll((contacts) => {
    //     // console.log(contacts.length);
    //     res.render('show-contacts', {
    //         pageTitle: 'Show Contacts',
    //         contacts: contacts,
    //         path: '/',
    //         count: contacts.length
    //     });
    // });
};