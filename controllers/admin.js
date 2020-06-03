const Contact = require('../models/contact');

exports.getAddContact = (req, res, next) => {
    res.render('admin/add-contact', {
        pageTitle: 'Add Contacts',
        path: '/add-contact'
    });
};

exports.postAddContact = (req, res, next) => {
    const name = req.body.name;
    const dob = req.body.dob;
    const tel = req.body.tel;
    const email = req.body.email;
    const contact = new Contact(name, dob, tel, email);
    contact.save();
    res.redirect('/');
};

exports.getContact = (req, res, next) => {
    const contactId = req.params.contactId;
    Contact.findById(contactId, contact => {
        console.log(contact);
    });
    res.redirect('/');
};