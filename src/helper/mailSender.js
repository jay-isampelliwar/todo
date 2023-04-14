const nodeMailer = require("nodemailer");
const otpSender = async (emailTo, otp) => {
  console.log(emailTo);
  console.log(otp);
  let transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  let msg = {
    from: process.env.EMAIL,
    to: emailTo,
    subject: "Your Verification Code From TODO",
    html: `<p>Code is <b>${otp}</b><p/>`,
  };

  await transporter.sendMail(msg);
};

module.exports = { otpSender };
