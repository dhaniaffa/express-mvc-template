import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

const env: string = process.env.NODE_ENV || 'development';

const envFile: string =
  {
    production: '.env.production',
    development: '.env.development',
  }[env] || '.env';

const envPath: string = path.join(process.cwd(), envFile);

const finalEnvPath: string = fs.existsSync(envPath) ? envPath : path.join(process.cwd(), '.env');

if (!fs.existsSync(finalEnvPath)) {
  console.error(`❌ No .env file found for NODE_ENV=${env}`);
  process.exit(1);
}

dotenv.config({ path: finalEnvPath });

export const NODE_ENV = env;
export const ENV_FILE = path.basename(finalEnvPath);
