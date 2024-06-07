module.exports = (req, res) => {
  console.log('Request received:', req.method, req.body);
  if (req.method === 'POST') {
    const { email } = req.body;
    if (email) {
      // Log the received email
      console.log('Email received:', email);
      res.status(200).json({ message: 'Email received!', email });
    } else {
      console.log('No email provided');
      res.status(400).json({ message: 'Email is required' });
    }
  } else {
    console.log('Invalid method');
    res.status(405).json({ message: 'Method not allowed' });
  }
};
