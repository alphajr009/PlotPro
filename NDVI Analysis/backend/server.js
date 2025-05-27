const express = require('express');
const cors = require('cors');
const ndviRoutes = require('./routes/ndviRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/ndvi', ndviRoutes);

// Test route (optional)
app.get('/test', (req, res) => {
  res.send('✅ Server is alive');
});

const PORT = 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
