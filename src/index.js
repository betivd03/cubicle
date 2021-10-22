const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const routes = require('./routes.js');
const config = require('./config/config.json')[process.env.NODE_ENV]; // [process.env.NODE_ENV || 'development']
const initDataBase = require('./config/database.js');

// const initHandlebars = require('./config/handlebars.js');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// initHandlebars(app);

require('./config/handlebars.js')(app);

app.use(express.static(path.resolve(__dirname, './public')));
app.use(routes);

initDataBase(config.DB_CONNECTION_STRING)
    .then(() => {
        app.listen(config.PORT, console.log.bind(console, `Application is running on http://localhost:${config.PORT}`));
    })
    .catch((err) => {
        console.log('Application init failed: ', err);
    })
