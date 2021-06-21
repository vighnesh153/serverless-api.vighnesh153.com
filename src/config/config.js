/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const path = require('path');

const missingEnvVars = [];
const addMissingEnvVar = (varName) => missingEnvVars.push(varName);

const environment = process.env['STAGE'] === 'dev' ? 'development' : 'production';
const isProduction = () => environment === "production";

const config = {
  // Project meta information
  PROJECT_DIR: path.resolve(__dirname, '..', '..'),
  SERVICE_NAME: 'serverless-api.vighnesh153.com',

  // Server configurations
  ENV: environment,
  COOKIE_SECRET: process.env.COOKIE_SECRET || addMissingEnvVar('COOKIE_SECRET'),
  SESSION_EXPIRY_HOURS: isProduction() ? 7 * 24 : 1, // 7 days for production and 1 hour for dev

  // Table names
  TABLE_NAMES: {
    USERS: process.env.USERS_TABLE,
    SESSIONS: process.env.SESSIONS_TABLE,
  },

  // URL meta information
  DOMAIN: process.env.DOMAIN || addMissingEnvVar('DOMAIN'),
  HOST_URL: `https://${process.env.DOMAIN}`,
  AUTH_CLIENT_URL: process.env.AUTH_CLIENT_URL || addMissingEnvVar('AUTH_CLIENT_URL'),

  // Google Details
  GOOGLE_ADMIN_EMAILS: process.env.GOOGLE_ADMIN_EMAILS.split(','),

  // Google OAuth
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

  UTILS: {
    isProduction,
  },
};

if (missingEnvVars.length > 0) {
  console.log('Missing environment variables:');
  missingEnvVars.forEach((envVar) => {
    console.log(envVar);
  });
  process.exit(1);
}

console.log(config);

module.exports = config;
