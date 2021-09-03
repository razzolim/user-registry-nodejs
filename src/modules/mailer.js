const path = require('path');
const mailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const mailConfig = require('../config/mail');

var transport = mailer.createTransport({
    host: mailConfig.host,
    port: mailConfig.port,
    auth: { 
        user: mailConfig.user, 
        pass: mailConfig.pass 
    }
});

transport.use('compile', hbs({
    viewEngine: {
        defaultLayout: undefined,
        partialsDir: path.resolve('./src/resources/mail/')
    },
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html'
}));

module.exports = transport;