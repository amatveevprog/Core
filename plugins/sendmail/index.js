var Promise = require('promise');
var mailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var smtpLocalTransport = require('nodemailer-sendmail-transport');



var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'amatveev.prog@gmail.com',
        pass: '******'
    }
};
var poolConfig = {
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'amatveev.prog@gmail.com',
        pass: '******'
    }
};
var transport = mailer.createTransport(smtpTransport(poolConfig
    /*service:'gmail',
    auth: {
        user:'amatveev.prog@gmail.com',
        pass:'1q2w9o0p'
    }*/
));

var transport2 = mailer.createTransport(
  smtpLocalTransport({})
);
var params = {
    to:'alexey.matveev1@rambler.ru',
    subject:'hi,body',
    text:'some_text2'
};

transport.sendMail(params,function (err,res) {
    if(err)
    {
        console.error(err);
    }
    else
    {
        console.log(res);
    }
});
/*transport2.sendMail(params,function (err,res) {
    if(err)
    {
        console.error(err);
    }
    else
    {
        console.log(res);
    }
});*/
function sendTestEmail(from,to,subject,text) {

}

//сценарий отправки писем...
exports.init = function()
{

}
exports.sendMail = function() {

}