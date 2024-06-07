module.exports = (req, res) => {
  if (req.method === 'POST') {
    const { email } = req.body;
    if (email) {
      // Save the email to a database or send an email
      // For simplicity, we'll just send a response back
      res.status(200).json({ message: 'Email received!', email });
    } else {
      res.status(400).json({ message: 'Email is required' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
