const Contact = require('../models/contact');

exports.getAddContact = (req, res, next) => {
    res.render('admin/add-contact', {
        pageTitle: 'Add Contacts',
        path: '/add-contact',
    });
};

exports.postAddContact = (req, res, next) => {
    var tele = 'tel[]';
    var mail = 'email[]';
    const name = req.body.name;
    const dob = req.body.dob;
    const tel = req.body[tele];
    const email = req.body[mail];
    const contact = new Contact({
        name: name,
        dob: dob,
        email: email,
        tel: tel
    });
    contact.save();
    res.redirect('/');
};

exports.getContact = (req, res, next) => {
    const contactId = req.params.contactId;
    Contact.findById(contactId)
        .then(contact => {
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
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postUpdatedContact = (req, res, next) => {
    var tele = 'tel[]';
    var mail = 'email[]';
    const contactId = req.body._id;
    const name = req.body.name;
    const dob = req.body.dob;
    const tel = req.body[tele];
    const email = req.body[mail];
    Contact.findById(contactId)
        .then(contact => {
            contact.name = name;
            contact.dob = dob;
            contact.tel = tel;
            contact.email = email;
            return contact.save();
        })
        .then(() => {
            console.log('Updated!!');
            res.redirect('/');
        })
        .catch(err => console.log(err));
};

exports.deleteContact = (req, res, next) => {
    const contactId = req.params.contactId;
    Contact.findByIdAndRemove(contactId)
        .then(() => {
            res.redirect('/');
        })
};