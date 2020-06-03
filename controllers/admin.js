const Contact = require('../models/contact');

exports.getAddContact = (req, res, next) => {
    res.render('admin/add-contact', {
        pageTitle: 'Add Contacts',
        path: '/add-contact'
    });
};

exports.postAddContact = (req, res, next) => {
    var tele = 'tel[]';
    var mail = 'email[]';
    const name = req.body.name;
    const dob = req.body.dob;
    const tel = req.body[tele];
    const email = req.body[mail];
    const contact = new Contact(name, dob, tel, email);
    contact.save();
    res.redirect('/');
};

exports.getContact = (req, res, next) => {
    const contactId = req.params.contactId;
    Contact.findById(contactId, contact => {
        const is_tel_string =  (typeof contact.tel === "string") ? "string" : "array";
        const is_email_string =  (typeof contact.email === "string") ? "string" : "array";
        let firstTelEl = null;
        let firstEmailEl = null;
        if(is_tel_string === "array"){
            firstTelEl = contact.tel.shift();
        }
        if(is_email_string === "array"){
            firstEmailEl = contact.email.shift();
        }
        res.render('admin/update-contact', {
            pageTitle: contact.name,
            path: '/add-contact',
            contact: contact,
            is_tel_string: is_tel_string,
            is_email_string: is_email_string,
            firstTelEl: firstTelEl,
            firstEmailEl: firstEmailEl
        });
    });
};

exports.postUpdatedContact = (req, res, next) => {
    var tele = 'tel[]';
    var mail = 'email[]';
    const contactId = req.body.id;
    const name = req.body.name;
    const dob = req.body.dob;
    const tel = req.body[tele];
    const email = req.body[mail];
    console.log(req.body);
    Contact.updateContact(contactId, name, dob, tel, email);
    res.redirect('/');
}

exports.deleteContact = (req, res, next) => {
    const contactId = req.params.contactId;
    Contact.deleteById(contactId);
    res.redirect('/');
}