import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rahulvishwakarma6737@gmail.com ',
        pass: 'tcyd bbph pjpl snzp'
    }
});


export const sendOTP = (email, otp) => {

    const mailOptions = {
        from: 'rahulvishwakarma6737@gmail.com',
        to: email,
        subject: 'OTP Verification for Forget Password by UtsavUphaar Application',
        text: `Your OTP is: ${otp}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent successfully...');
        }
    });
};
