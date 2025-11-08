import './env';

/**
 * Logger configuration (loaded from environment variables)
 *
 * Each value has a sensible default so the logger works out-of-the-box.
 * You can override them in your `.env`, `.env.development` or `.env.production`.
 */

/**
 * LOG_LEVEL
 * - One of: error | warn | info | http | debug
 * - Default: `debug` when NODE_ENV=development, otherwise `warn`.
 * - Controls the minimum level that will be logged.
 */
export const LOG_LEVEL =
  process.env.LOG_LEVEL || (process.env.NODE_ENV === 'development' ? 'debug' : 'warn');

/**
 * LOG_ENABLE_STACK
 * - true | false
 * - When true, stack traces will be included in console output (useful for debugging).
 * - Default: false (do not expose stacks unless explicitly enabled).
 */
export const LOG_ENABLE_STACK = (process.env.LOG_ENABLE_STACK || 'false').toLowerCase() === 'true';

/**
 * LOG_ROTATION_STRATEGY
 * - none  : do not write rotated files (log to stdout only)
 * - daily : rotate logs per-day using winston-daily-rotate-file
 * - size  : rotate based on file size using built-in file transport
 * - Default: daily
 */
export const LOG_ROTATION_STRATEGY = (process.env.LOG_ROTATION_STRATEGY || 'daily').toLowerCase();

/**
 * LOG_MAX_DAYS
 * - Number of days to keep rotated logs when using daily rotation.
 * - In daily mode this is suffixed with 'd' by the rotation transport (e.g. '30d').
 * - Default: '30'
 */
export const LOG_MAX_DAYS = process.env.LOG_MAX_DAYS || '30';

/**
 * LOG_MAX_SIZE
 * - Maximum log file size before rotation (e.g. '10m', '5m').
 * - Used both by daily rotate (as maxSize) and size-based rotation.
 * - Default: '10m'
 */
export const LOG_MAX_SIZE = process.env.LOG_MAX_SIZE || '10m';

/**
 * LOG_ZIP_ARCHIVE
 * - true | false
 * - When true, rotated files will be gzipped to save disk space.
 * - Default: true
 */
export const LOG_ZIP_ARCHIVE = (process.env.LOG_ZIP_ARCHIVE || 'true').toLowerCase() === 'true';

/**
 * LOG_DIR
 * - Directory where log files will be written when using file transports.
 * - Default: './logs' (relative to project root). Make sure the process has write permission.
 */
export const LOG_DIR = process.env.LOG_DIR || './logs';

/**
 * LOG_PRETTY
 * - true | false
 * - When true, log output will be formatted and colorized.
 * - Default: true for development, false for production
 */
export const LOG_PRETTY =
  (
    process.env.LOG_PRETTY ?? (process.env.NODE_ENV === 'development' ? 'true' : 'false')
  ).toLowerCase() === 'true';
