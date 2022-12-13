const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

// contact mail 
const sendContactMail = (fullname, email, subject, body) => {
  var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: "587",
    auth: {
      user: process.env.SMTP_ADDRESS,
      pass: process.env.SMTP_APP_PASS
    }
  }));

  var mailOptions = {
    from: fullname,
    to: "uzaaaaaair@gmail.com",
    subject: subject,
    text: 'That was easy!',
    html: body + ' here is my email address ' + email
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


}

// verification 
const sendMail = (email, uniqueString) => {
  var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.SMTP_ADDRESS,
      pass: process.env.SMTP_APP_PASS
    }
  }));
  let sender = "SMART PYTHON IDE"
  var mailOptions = {
    from: sender,
    to: email,
    subject: 'IDE EMAIL CONFIRMATION!',
    text: 'That was easy!',
    attachments: [{
      filename: 'Logo.png',
      path: 'http://localhost:1337/eyelogo.png',
      cid: 'logo' 
 }],
    html: `
    <img src="cid:logo" width="200" />
    <h1>SMART CODE</h1>
    <p>Hi there! we are very glad that you are here</p>
    Please press the 'verify account' button to verify your email and be a part of our community. Thanks
    <a href="${process.env.CLIENT_ADDRESS}/verify/${uniqueString}">Verify account</a>`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}

//random string
const randString = () => {
  const len = 8;
  let randStr = '';
  for (let i = 0; i < len; i++) {
    const ch = Math.floor((Math.random() * 10) + 1)
    randStr += ch;
  }
  return randStr;
}

module.exports = { sendMail, randString, sendContactMail };