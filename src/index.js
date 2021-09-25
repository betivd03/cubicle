const express = require('express');

// const initHandlebars = require('./config/handlebars.js');

const app = express();

// initHandlebars(app);

require('./config/handlebars.js')(app);

app.all('/', (req, res) => {
    res.render('index');
});

app.listen(5000, console.log.bind(console, 'Application is running on http://localhost:5000'));