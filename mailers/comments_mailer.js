const nodeMailer = require('../config/nodemailer');
exports.newComment = (comment) => {
    console.log('inside newComment mailer');
    nodeMailer.transporter.sendMail({
        from: 'rohan@codeial.com',
        to: comment.user.email,
        subject: 'New Comment Published',
        html: '<h1>Yup, Your Comment Posted</h1>'
    }, (err, info) => {
        if(err){console.log('error in sending the mail', err); return;}
        console.log('Mail Dilevered');
        return;
    });
}