global.__base = __dirname + '/';

const express = require('express');
const app = express();
const config = require('config');
const bodyParser = require('body-parser');
const port = config.get('port.portName');
const cookieSession = require('cookie-session');
const cookieKey = config.get('secret.cookieKey');
const router = require(`${__base}/routes`);
const db = require(`${__base}/models`);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cookieSession({
    secret: cookieKey,
    maxAge: 30 * 24 * 60 * 60 * 1000
}));

app.use(router);

async function startApp() {
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully...');
        app.listen(port, () => console.log(`Web server listening on port ${port}!`))
    } catch (e) {
        console.error('Unable to connect to the database: ' + e);
        setInterval(startApp, 5000);
    }
}

startApp();

module.exports = app;