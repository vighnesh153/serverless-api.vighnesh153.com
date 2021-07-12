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
  ROOT_DOMAIN: 'vighnesh153.com',
  COOKIE: {
    SECURE: true,
    SECRET: process.env.COOKIE_SECRET || addMissingEnvVar('COOKIE_SECRET'),
    DOMAIN: 'vighnesh153.com',
    SAME_SITE: isProduction() ? 'strict' : 'none',
    XSRF_COOKIE_NAME: 'vighnesh153-XSRF-TOKEN',
  },
  SESSION: {
    COOKIE_NAME: 'session.vighnesh153.com',
    DURATION: 7 * 24 * 60 * 60 * 1000,  // 7 days
    HASH_KEY: process.env.SESSION_HASH_KEY,
  },

  // Table names
  TABLE_NAMES: {
    USERS: process.env.USERS_TABLE,
    SESSIONS: process.env.SESSIONS_TABLE,
    AUDITS: process.env.AUDITS_TABLE,
  },

  // S3 buckets
  S3_BUCKETS: {
    PUBLIC_ASSETS: {
      NAME: process.env.PUBLIC_ASSETS_BUCKET_NAME,
      URL: `https://s3.amazonaws.com/${process.env.PUBLIC_ASSETS_BUCKET_NAME}`,
    },
    BACKEND: {
      NAME: process.env.BACKEND_BUCKET_NAME,
      URL: `https://s3.amazonaws.com/${process.env.BACKEND_BUCKET_NAME}`,
    },
  },

  // Cloudfront
  CLOUDFRONT: {
    PUBLIC_ASSETS: {
      DOMAIN: process.env.PUBLIC_ASSETS_CLOUDFRONT_ALIAS,
      URL: `https://${process.env.PUBLIC_ASSETS_CLOUDFRONT_ALIAS}`,
    },
  },

  // Content Security Policy
  CONTENT_SECURITY_POLICY: {
    DEFAULT_SRC: [],
    SCRIPTS_SRC: [],
    STYLES_SRC: [],
    IMAGE_SRC: [],
  },

  // URL meta information
  DOMAIN: process.env.DOMAIN || addMissingEnvVar('DOMAIN'),
  HOST_URL: `https://${process.env.DOMAIN}`,

  // Google Details
  GOOGLE_ADMIN_EMAILS: process.env.GOOGLE_ADMIN_EMAILS.split(','),

  // Google OAuth
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

  UTILS: {
    isProduction,
  },
};

config.CONTENT_SECURITY_POLICY.SCRIPTS_SRC = [
  `${config.CLOUDFRONT.PUBLIC_ASSETS.URL}/`,
];
config.CONTENT_SECURITY_POLICY.STYLES_SRC = [
  `${config.CLOUDFRONT.PUBLIC_ASSETS.URL}/`,
];
config.CONTENT_SECURITY_POLICY.IMAGE_SRC = [
  `${config.CLOUDFRONT.PUBLIC_ASSETS.URL}/`,
];

if (missingEnvVars.length > 0) {
  console.log('Missing environment variables:');
  missingEnvVars.forEach((envVar) => {
    console.log(envVar);
  });
  process.exit(1);
}

console.log(config);

module.exports = config;
