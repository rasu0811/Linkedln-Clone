const express = require('express');
const cors = require('cors');

const app = express();

// Use CORS middleware
app.use(cors({
  origin: '*',
  methods: ["GET", "POST", "DELETE", "PUT"],
}));

// Example route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
