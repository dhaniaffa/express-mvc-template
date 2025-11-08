import './env';

/**
 * Server configuration (loaded from environment variables)
 *
 * Default: 3000
 */
export const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
