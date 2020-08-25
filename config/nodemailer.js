const nodemailer = require('nodemailer');
const ejs = require('ejs');
const { request } = require('express');
const path = require('path');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'rohansharma.08062001@gmail.com',
        pass: 'fjnuyzsuipbruwzh'
    }
});
let renderTempelate = (data, relativePath) => {
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template) {
            if (err) {
                console.log('error in rendering template');
                return;
            }
            mailHtml = template;
        }
    )
    return mailHtml;
}
module.exports = {
    transporter: transporter,
    renderTempelate: renderTempelate
}