const Contact = require('../models/contact');
const search = require('../public/js/search');

const ITEMS_PER_PAGE = 4;

exports.getContact = (req, res, next) => {
    const page = +req.query.page || 1;
    let totalItems;
    search.data.another();

    Contact.find()
        .countDocuments()
        .then(count => {
            totalItems = count;
            return Contact.find({userId: req.user._id})
                .sort({ name: 1})
                .skip((page - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE);
        })
        .then(contacts => {
            res.render('show-contacts', {
                pageTitle: 'My Contacts',
                contacts: contacts,
                path: '/my-contacts',
                count: contacts.length,
                hasNextPage: ITEMS_PER_PAGE * page < totalItems,
                hasPreviousPage: page > 1,
                currentPage: page,
                nextPage: page + 1,
                previousPage: page - 1,
                lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.homePage = (req, res, next) => {
    res.render('home-page', {
        pageTitle: 'Contact Book',
        path: '/'
    });
}