import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

// Tambahkan konfigurasi lain di sini jika diperlukan
