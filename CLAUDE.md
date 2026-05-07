# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (Webpack mode)
npm run build    # Production build
npm start        # Run production server
npm run lint     # Run ESLint

# Docker (includes MongoDB)
docker-compose up
```

No test suite is currently configured.

## Architecture

**SEYA** is a Next.js 16 SaaS app with an AI chat interface, bilingual (EN/AR) support, and payment processing.

### Routing

All user-facing pages live under `src/app/[locale]/` — the `[locale]` segment is always `en` or `ar`. API routes live under `src/app/api/` and are locale-independent.

### Authentication

JWT-based auth stored in an HTTP-only cookie named `seya_auth`. Token logic is in `src/lib/jwt.ts` (uses `jose`). `src/lib/auth.ts` re-exports bcryptjs helpers. The `AuthGate` component handles client-side route protection.

### Database

MongoDB via native `MongoClient` with a global connection cache (`src/lib/mongodb.ts`). No ORM. Collections: `users`, `password_resets`, `chat_sessions`. The connection URI defaults to `mongodb://mongo:27017/seya` and is overridden by `MONGODB_URI`.

### Payments

Paymob Flash API (`src/lib/paymob.ts`). `/api/paymob/initiate` creates a payment intention; `/api/paymob/callback` handles the webhook and verifies the HMAC-SHA512 signature.

### Internationalization

`next-intl` 4.x. Locale routing is configured in `src/i18n/routing.ts`. Translation strings live in `messages/en.json` and `messages/ar.json`. Arabic pages render with `dir="rtl"`.

### Styling

Tailwind CSS v4 (PostCSS plugin). Dark theme by default (`dark` class on `<html>`). Custom theme tokens are defined in `src/app/globals.css`. Framer Motion is used for animations; CSS Modules (`.module.css`) for scoped component styles.

### Environment Variables

| Variable | Purpose |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | JWT signing secret |
| `PAYMOB_SECRET_KEY` | Paymob API key |
| `PAYMOB_HMAC_SECRET` | Paymob webhook HMAC secret |
| `NEXT_PUBLIC_APP_URL` | Base URL for generated links |

### Path Alias

`@/*` maps to `src/*` (configured in `tsconfig.json`).
