const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  console.log("Request received:", req.method, req.body);
  if (req.method === "POST") {
    const { email } = req.body;
    if (email) {
      try {
        // Create a transporter using the Gmail account
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        // Define the email options for notifying you
        let mailOptionsToYou = {
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: "¡Usuario nuevo en Gabibyte!",
          text: `Un nuevo usuario se ha registrado: ${email}`,
        };

        // Define the email options for thanking the user
        let mailOptionsToUser = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "¡Bienvenido a Gabibyte!",
          text: "¡Gracias por unirte a Gabibyte! Te avisaremos cuando la tienda abra, guarda este email para un 15% de descuento.",
        };

        // Send email to you
        await transporter.sendMail(mailOptionsToYou);
        // Send email to the user
        await transporter.sendMail(mailOptionsToUser);

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
