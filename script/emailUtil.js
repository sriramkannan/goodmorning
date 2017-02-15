var nodemailer = require('nodemailer');
var smtpTransport = require("nodemailer-smtp-transport");


/*var prompt = require('prompt');

var schema = {
    properties: {
        email: {
            pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            message: 'must be a valid email address',
            required: true
        },
        password: {
            hidden: true,
            required: true
        }
    }
};

// 
// Start the prompt 
// 
prompt.start();

var email, password;

// 
// Get two properties from the user: email, password 
// 
prompt.get(schema, function(err, result) {
    // 
    // Log the results. 
    // 
    console.log('Command-line input received');
    email = result.email;
    password = result.password;

*/

function sendEmail(email, password, data, email_list) {
    var transporter = nodemailer.createTransport(smtpTransport({
        host: "smtp.office365.com",
        port: 587,
        auth: {
            user: email,
            pass: password
        }
    }));


    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: email, // sender address
        to: email_list, // list of receivers
        subject: 'Health Report', // Subject line
        //text: JSON.stringify(data), // plaintext body
        html: data // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}

module.exports.sendEmail = sendEmail;

//});
