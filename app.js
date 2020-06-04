const path = require('path');
const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const contactRoutes = require('./routes/add-contact');
const showContactsRoutes = require('./routes/show-contacts');
const errorController = require('./controllers/error');
// const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(contactRoutes);
app.use(showContactsRoutes);

app.use(errorController.get404);

// app.use((req, res, next) => {
//     User.findById('5ed8d2dfa38520329480f40b')
//         .then(user => {
//             req.user = user;
//             next();
//         })
//         .catch(err => console.log(err));
// });

mongoose
    .connect('mongodb+srv://rohit_new:rohit_new@cluster0-po0x5.mongodb.net/contact_book?retryWrites=true&w=majority')
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });