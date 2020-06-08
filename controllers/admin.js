const { validationResult } = require('express-validator');
const Contact = require('../models/contact');

exports.getAddContact = (req, res, next) => {
    res.render('admin/add-contact', {
        pageTitle: 'Add Contacts',
        path: '/add-contact',
        errorMessage: false
    });
};

exports.getAddProfile = (req, res, next) => {
    const contactId = req.params.contactId;
    res.render('admin/add-profile', {
        pageTitle: 'Add Profiles',
        path: '/add-contact',
        contactId: contactId,
        errorMessage: false,
    });
}

exports.postAddProfile = (req, res, next) => {
    const userId = req.user._id;
    const contactId = req.body.contactId;
    const profile_pic = req.file;
    // console.log(profile_pic);
    if(!profile_pic){
        return res.status(422).render('admin/add-profile', {
            pageTitle: 'Add Profiles',
            path: '/add-contact',
            contactId: contactId,
            errorMessage: 'Attached file is not an image!'
        });
    }
    const profile_pic_url = profile_pic.path;
    Contact.findById(contactId)
        .then(async contact => {
            contact.imageUrl = profile_pic_url;
            await contact.save();
            console.log('Profile Updated!!');
            res.redirect('/my-contacts');
        })
        .catch(err => {
            console.log(err);
            // const error = new Error(err);
            // error.httpStatusCode = 500;
            // return next(error);
        });
}

exports.postAddContact = (req, res, next) => {
    var tele = 'tel[]';
    var mail = 'email[]';
    const name = req.body.name;
    const dob = req.body.dob;
    const tel = req.body[tele];
    const email = req.body[mail];
    const userId = req.user._id;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors.array());
        return res.status(422).render('admin/add-contact', {
            pageTitle: 'Add Contacts',
            path: '/add-contact',
            errorMessage: errors.array()[0].msg
        });
    }
    const contact = new Contact({
        name: name,
        dob: dob,
        email: email,
        tel: tel,
        userId: userId,
        imageUrl: ''
    });
    contact.save();
    res.redirect('/my-contacts');
};

exports.getUpdateContact = (req, res, next) => {
    const contactId = req.params.contactId;
    Contact.findById(contactId)
        .then(contact => {
            // throw new Error('Dummy');
            let firstTelEl = contact.tel.shift();
            let firstEmailEl = contact.email.shift();
            res.render('admin/update-contact', {
                pageTitle: contact.name,
                path: '/add-contact',
                contact: contact,
                firstTelEl: firstTelEl,
                firstEmailEl: firstEmailEl
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
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
            //restricting that the wrong user can't update another's contact
            if(contact.userId.toString() !== req.user._id.toString()){
                return res.redirect('/');
            }
            contact.name = name;
            contact.dob = dob;
            contact.tel = tel;
            contact.email = email;
            return contact.save()
                .then(() => {
                    console.log('Updated!!');
                    res.redirect('/my-contacts');
                });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.deleteContact = (req, res, next) => {
    const contactId = req.params.contactId;
    Contact.deleteOne({ _id: contactId, userId: req.user._id })
        .then(() => {
            res.status(200).json({message: 'Deleting Success!'});
        })
        .catch(err => {
            res.status(500).json({message: 'Deleting failed!'});
        });
};