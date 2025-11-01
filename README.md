# Express MVC Pattern Template

A scalable Express.js project using TypeScript, MVC pattern, DTOs, services, and environment separation. Includes linting, formatting, and resource route macro.

## Features

- TypeScript with strict config
- MVC structure: controllers, models, services, dtos, routes
- DTO for response consistency
- Zod validation for request body
- Custom error handling and async wrapper
- Resource route macro (like Laravel)
- Environment separation: `.env.development`, `.env.production`, `.env.example`
- ESLint, Prettier, EditorConfig

## Prerequisites

1. Node.js (version 18 or higher)
2. npm (version 8.6.0 or higher)

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Copy environment file**
   ```bash
   cp .env.example .env.development
   cp .env.example .env.production
   # Edit values as needed
   ```
3. **Run development server**
   ```bash
   NODE_ENV=development npm run dev
   ```
4. **Build & minify**
   ```bash
   npm run build
   ```
5. **Start production server**
   ```bash
   NODE_ENV=production npm start
   ```

## Project Structure

```
src/
  controllers/
  dtos/
  middleware/
  models/
  routes/
  services/
  utils/
  config/
```

## Lint & Format

- `npm run lint` — Run ESLint
- `npm run format` — Run Prettier

## Environment

- `.env.example` — Template for environment variables
- `.env.development`, `.env.production` — Actual config (ignored by git)

## Contributing

- Fork and PR welcome
- Please use lint/format before commit

## License

MIT
