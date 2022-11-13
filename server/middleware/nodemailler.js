//Create Mailler
const env = require("dotenv").config({path: '../../config/.env'});
const nodemailer =  require('nodemailer'); // khai báo sử dụng module nodemailer
let mailler = (async(TEXT)=>{
    try {
        var transporter =  nodemailer.createTransport({ // config mail server
            service: 'Gmail',
            auth: {
                user: process.env.FROM_MAIL,
                pass: process.env.PASS_MAIL
            }
        });
        var mainOptions = { 
            // thiết lập đối tượng, nội dung gửi mail
            from: 'Administrator System Mail',
            to: process.env.TO_MAIL,
            subject: process.env.SUBJECT_MAIL,
            text: TEXT
        }
        transporter.sendMail(mainOptions, function(err, info){
            if (err) {
                console.log(err); 
            } else {
                console.log('Message sent: ' +  info.response);     
            }
        }); 
    } catch (error) {
       console.error(error);
    }
});
module.exports = mailler;