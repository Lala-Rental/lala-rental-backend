import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_FROM_EMAIL,
    pass: process.env.MAIL_APP_PASSWORD
  },
});

/**
 * Send welcome email to user
 * 
 * @param {string} email - Recipient email
 * @param {string} name - User's name
 */
export const sendWelcomeEmail = async (email: string, name: string) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Welcome to ${process.env.APP_NAME}, ${name}!`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h1 style="color: #4CAF50;">Welcome, ${name}!</h1>
            <p>Thank you for joining <strong>${process.env.APP_NAME}</strong>. We're thrilled to have you on board.</p>
            <p>Here are a few things you can do to get started:</p>
            <ul>
              <li>Explore our <a href="${process.env.APP_URL}/listings" style="color: #4CAF50;">Listings</a></li>
              <li>Post your own <a href="${process.env.APP_URL}/become-host" style="color: #4CAF50;">Property</a> for the best sales</li>
            </ul>
            <p>If you have any questions, feel free to <a href="mailto:${process.env.MAIL_ADMIN_EMAIL}" style="color: #4CAF50;">contact us</a>.</p>
            <p>Best regards,<br>The ${process.env.APP_NAME} Team</p>
          </div>
        `,
    };

  try {
    await transporter.sendMail(mailOptions);
    // TODO Add Feedback from thi method
    console.log(`✅ Welcome email sent to ${email}`);
  } catch (error) {
    console.error("❌ Error sending welcome email:", error);
  }
};
