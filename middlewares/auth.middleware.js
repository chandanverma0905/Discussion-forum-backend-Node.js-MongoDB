const dotenv = require('dotenv');

dotenv.config();

const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey === process.env.API_KEY) {
    next();
  }
   else {
    res.status(403).json({ message: 'Unauthorized Access' });
  }
};

module.exports = { validateApiKey };
