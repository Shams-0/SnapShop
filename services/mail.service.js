const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "snapshop423@gmail.com",
        pass: "khifionkvvxuredv"
      }
    })
  };
  async sendForgetPasswordEmail(user, token) {
    if (!user) res.status(400).json({ message: "Unauthorized access: User does not exist" });
    await this.transporter.sendMail({
      from: "SnapShop <no-reply SendingMail>",
      subject: "Reset Password",
      to: user.email,
      html:
        `<p>You requested a password reset.</p>
        <p>Click on the given link to set a new password.</p>
        <a href="http://localhost:2020/reset-password/${token}">Reset Password</a>`,
    }).then(() => console.log("Successfully Mail Send."))
      .catch((err) => console.log("Error: ", err));

    return;
  }
}

module.exports = MailService;