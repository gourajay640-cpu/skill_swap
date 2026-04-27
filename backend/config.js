// Configuration file for development and production
// Customize settings here

module.exports = {
  // Server Configuration
  server: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
  },

  // Database Configuration
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/skillswap',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },

  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret_key_change_this_in_production',
    expiresIn: process.env.JWT_EXPIRE || '7d',
  },

  // CORS Configuration
  cors: {
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
    optionsSuccessStatus: 200,
  },

  // API Limits
  api: {
    jsonLimit: '10mb',
    urlEncodedLimit: '10mb',
  },

  // Password Configuration
  password: {
    saltRounds: 10,
    minLength: 6,
  },

  // Email Configuration (for future use)
  email: {
    from: process.env.EMAIL_FROM || 'noreply@skillswap.com',
    // Add email service configuration here
  },

  // Features
  features: {
    emailVerification: false,
    twoFactorAuth: false,
    socialLogin: false,
  },
};
