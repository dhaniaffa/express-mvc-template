import dotenv from 'dotenv';

// Load .env based on NODE_ENV. Keep logic centralized so all modules share the same env config.
const env = process.env.NODE_ENV || 'development';
const envFile =
  env === 'production' ? '.env.production' : env === 'development' ? '.env.development' : '.env';

dotenv.config({ path: envFile });

export const NODE_ENV = env;
export const ENV_FILE = envFile;
