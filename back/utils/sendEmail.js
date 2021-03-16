var nodemailer = require("nodemailer");

function sendEmail(email) {
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465, 
        secure: true,
        auth: {
          user: "arwinesvinoteca@gmail.com",
          pass: "navcdjuichdbxrvz"
        }
      });
      
      var mailOptions = {
        from: 'arwinesvinoteca@gmail.com',
        to: email,
        subject: "Arwines - Compra realizada con exito",
        text:
          "Su compra en ArWines fue realizada de con exito! Que lo disfrutes :)",
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(err.message);
          return err.message
        } else {
          console.log("Email sent");
          return info
        }
      });
}

module.exports = sendEmail;