const path = require('path');
const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');

const contactRoutes = require('./routes/add-contact');
const showContactsRoutes = require('./routes/show-contacts');
const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(contactRoutes);
app.use(showContactsRoutes);

app.use(errorController.get404);

app.listen(3000);