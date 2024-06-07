const nodemailer = require('nodemailer');

export default async (req, res) => {
  try {
    // Check if the request method is POST
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method Not Allowed' });
      return;
    }

    // Parse the JSON body manually
    const { email } = JSON.parse(req.body);

    // Validate email
    if (!email) {
      res.status(400).json({ error: 'Email is required' });
      return;
    }

    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Setup email data
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Notification',
      text: `A new user has signed up with the email: ${email}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};
