// Extra Security Packages
const express = require('express');
const helmet = require('helmet');
const { body, query, param, validationResult } = require('express-validator'); // Added express-validator
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

// Instantiate Server
const app = express();
app.use(helmet());
// app.use(cors({
//   origin: '[invalid url, do not cite]', // Replace with your frontend URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true, // Allow cookies to be sent with requests
// }));
app.use(cors())
app.use(express.json());
dotenv.config();

// Custom XSS sanitization middleware using express-validator
const sanitizeInput = [
  body('*').trim().escape(), // Sanitize body fields
  query('*').trim().escape(), // Sanitize query parameters
  param('*').trim().escape(), // Sanitize URL parameters
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Apply sanitization globally
app.use(sanitizeInput);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(YAML.load('./src/swagger/swagger.yaml')));

// Import auth user middleware
const auth = require('./src/middleware/auth');

// Import Connect DB
const connectDB = require('./src/config/db');

// Import Routers
const authRoutes = require('./src/routes/authRoutes');
const propertyRoutes = require('./src/routes/propertyRoutes');
const userRoutes = require('./src/routes/userRoutes');
const marketplaceRoutes = require('./src/routes/marketplaceRoutes');

// Import error handler
const errorHandler = require('./src/middleware/errorHandler');

// Extra packages here
const limiter = require('./src/middleware/rateLimiter');
app.use(limiter);

// Main Home
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to SuiMark DApp API' });
});

// Api Doc
app.get('/api', (req, res) => {
  res.redirect('/api-docs');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', auth, propertyRoutes);
app.use('/api/users', auth, userRoutes);
app.use('/api/marketplace', auth, marketplaceRoutes);

// Error handler
app.use(errorHandler);

// Port
const port = process.env.PORT || 9000; // Ensure port is 9000 as per error

// Start server
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
