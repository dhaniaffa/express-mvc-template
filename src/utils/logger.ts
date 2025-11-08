import fs from 'fs';
import path from 'path';
import util from 'util';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

import {
  LOG_ENABLE_STACK,
  LOG_LEVEL,
  LOG_ROTATION_STRATEGY,
  LOG_MAX_DAYS,
  LOG_MAX_SIZE,
  LOG_ZIP_ARCHIVE,
  LOG_DIR,
  LOG_PRETTY,
} from '../config/logger';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

winston.addColors(colors);

// ensure log directory exists when using file transports
if (LOG_ROTATION_STRATEGY !== 'none') {
  try {
    if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });
  } catch (e) {
    // if directory cannot be created, continue and let transports fail noisily
    console.warn('Could not create log directory', e);
  }
}

/**
 * Helper to parse sizes like '10m' -> bytes
 *
 * @param size: string
 *
 * @return number
 */
function parseSize(size: string): number {
  const matched = /^([0-9]+)([kKmMgG])?$/.exec(size);
  if (!matched) return Number(size) || 0;
  const num = Number(matched[1]);
  const unit = matched[2] && matched[2].toLowerCase();
  if (!unit) return num;
  if (unit === 'k') return num * 1024;
  if (unit === 'm') return num * 1024 * 1024;
  if (unit === 'g') return num * 1024 * 1024 * 1024;
  return num;
}

// formats
const timestampFormat = 'YYYY-MM-DD HH:mm:ss:ms';

const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: timestampFormat }),
  // colorize before printf so info.level is already colorized
  winston.format.colorize({ all: true }),
  winston.format.printf((info: winston.Logform.TransformableInfo) => {
    const raw = info as unknown as Record<string, unknown>;
    const ts =
      typeof raw.timestamp === 'string' ? raw.timestamp : JSON.stringify(raw.timestamp ?? '');
    const lvl = typeof raw.level === 'string' ? raw.level : JSON.stringify(raw.level ?? '');
    const msg = typeof raw.message === 'string' ? raw.message : JSON.stringify(raw.message ?? '');
    const base = `${ts} ${lvl}: ${msg}`;

    // collect remaining metadata (exclude known fields)
    const meta: Record<string, unknown> = {};
    for (const k of Object.keys(raw)) {
      if (k === 'level' || k === 'message' || k === 'timestamp' || k === 'stack') continue;
      meta[k] = raw[k];
    }

    let metaStr = '';
    if (Object.keys(meta).length > 0) {
      metaStr = LOG_PRETTY
        ? '\n' + util.inspect(meta, { colors: true, depth: 4, compact: false })
        : ' ' + JSON.stringify(meta);
    }

    const stack = (raw as { stack?: string }).stack;
    const stackStr = LOG_ENABLE_STACK && stack ? `\n${stack}` : '';

    return `${base}${metaStr}${stackStr}`;
  }),
);

const fileFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json(),
);

// build transports based on rotation strategy
const transportsList: winston.transport[] = [];

// always add console
transportsList.push(new winston.transports.Console({ format: consoleFormat }));

if (LOG_ROTATION_STRATEGY === 'daily') {
  transportsList.push(
    new DailyRotateFile({
      filename: path.join(LOG_DIR, 'error-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      zippedArchive: LOG_ZIP_ARCHIVE,
      maxSize: LOG_MAX_SIZE,
      maxFiles: `${LOG_MAX_DAYS}d`,
      format: fileFormat,
    }),
  );

  transportsList.push(
    new DailyRotateFile({
      filename: path.join(LOG_DIR, 'all-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: LOG_ZIP_ARCHIVE,
      maxSize: LOG_MAX_SIZE,
      maxFiles: `${LOG_MAX_DAYS}d`,
      format: fileFormat,
    }),
  );
} else if (LOG_ROTATION_STRATEGY === 'size') {
  // use built-in file transport with maxsize (bytes)
  transportsList.push(
    new winston.transports.File({
      filename: path.join(LOG_DIR, 'error.log'),
      level: 'error',
      maxsize: parseSize(LOG_MAX_SIZE),
      maxFiles: Number(LOG_MAX_DAYS) || 5,
      tailable: true,
      format: fileFormat,
    }),
  );

  transportsList.push(
    new winston.transports.File({
      filename: path.join(LOG_DIR, 'all.log'),
      maxsize: parseSize(LOG_MAX_SIZE),
      maxFiles: Number(LOG_MAX_DAYS) || 5,
      tailable: true,
      format: fileFormat,
    }),
  );
} else {
  // none: no file transports
}

const Logger = winston.createLogger({
  level: LOG_LEVEL,
  levels,
  transports: transportsList,
  exitOnError: false,
});

export default Logger;
