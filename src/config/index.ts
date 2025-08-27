import dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'development';
const envFile =
  env === 'production' ? '.env.production' : env === 'development' ? '.env.development' : '.env';
dotenv.config({ path: envFile });

export const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

// Tambahkan konfigurasi lain di sini jika diperlukan
