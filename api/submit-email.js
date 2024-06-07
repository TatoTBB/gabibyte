const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async (req, res) => {
  console.log("Request received:", req.method, req.body);
  if (req.method === "POST") {
    const { email } = req.body;
    if (email) {
      try {
        // Email to you
        const msgToYou = {
          to: process.env.EMAIL_USER,
          from: process.env.EMAIL_USER, // Use the same email address as the sender
          subject: "New Signup Notification",
          text: `A new user has signed up with the email: ${email}`,
        };

        // Email to user
        const msgToUser = {
          to: email,
          from: process.env.EMAIL_USER,
          subject: "Welcome to GABiBYTES",
          text: "Thank you for signing up! We will notify you once our store is open.",
        };

        // Send emails
        await sgMail.send(msgToYou);
        await sgMail.send(msgToUser);

        console.log("Emails sent successfully");
        res.status(200).json({ message: "Email received!", email });
      } catch (error) {
        console.error("Error sending emails:", error);
        res
          .status(500)
          .json({ message: "Error sending emails", error: error.message });
      }
    } else {
      console.log("No email provided");
      res.status(400).json({ message: "Email is required" });
    }
  } else {
    console.log("Invalid method");
    res.status(405).json({ message: "Method not allowed" });
  }
};
