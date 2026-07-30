# Octo Chat — Anonymous Chatting Application

Octo Chat is an anonymous, ephemeral chatting web application built with Next.js (App Router) and TypeScript. It focuses on low-friction anonymous conversations with simple sign-up + verification flows, server-side API endpoints for sending/receiving messages, and a small, component-driven frontend. This README documents the Next.js app located at nextjs/next-p and provides a complete developer guide for running, testing, extending, and deploying the project.

---

## Table of contents
- [Why Octo Chat?](#why-octo-chat)
- [Key features](#key-features)
- [Tech stack](#tech-stack)
- [Repository layout (focused)](#repository-layout-focused)
- [Architecture & data flow](#architecture--data-flow)
- [API reference (summary & examples)](#api-reference-summary--examples)
- [Local development](#local-development)
- [Environment variables](#environment-variables)
- [Deployment](#deployment)
- [Security, privacy & moderation](#security-privacy--moderation)
- [Testing & linting](#testing--linting)
- [Roadmap & ideas](#roadmap--ideas)
- [Contributing](#contributing)
- [Troubleshooting & FAQ](#troubleshooting--faq)
- [Credits & license](#credits--license)

---

## Why Octo Chat?
Octo Chat is designed for short, anonymous conversations where users don't need to reveal their identity. It is useful for icebreaker chats, anonymous feedback, mentorship warm-ups, and other scenarios where privacy and speedy interaction matter more than persistent profiles.

The project is intentionally small and modular so it can be used as:
- a learning example for Next.js App Router + TypeScript
- a starter template for ephemeral chat apps
- a prototype for experimenting with moderation, message suggestions, or AI-assisted replies


## Key features
- Anonymous sign-up with verification code (email/SMS) pattern
- Send and receive ephemeral messages through server-side API routes
- Message suggestions endpoint (AI or template-based helper)
- Username availability check
- Lightweight UI components: message cards and navbar
- Centralized proxy helper for outbound calls to 3rd-party services


## Tech stack
- Language: TypeScript
- Framework: Next.js (App Router)
- Styling: CSS / PostCSS (globals.css)
- Tooling: ESLint, TypeScript, npm

Notable dependencies (inferred from package.json): next, react, react-dom, typescript, postcss (see package.json for exact versions).


## Repository layout (focused on nextjs/next-p)
Below is an annotated tree of the files and directories I inspected inside nextjs/next-p (trimmed to the parts that matter to developers):

```
nextjs/next-p/
  package.json           # npm scripts & dependencies
  next.config.ts         # Next.js configuration
  tsconfig.json          # TypeScript config
  postcss.config.mjs     # PostCSS setup
  eslint.config.mjs      # ESLint config
  components.json        # component metadata (optional)
  proxy.ts               # central outbound HTTP proxy/helper
  public/                # static assets (icons, images, etc.)
  src/
    app/                 # Next App Router (routes + pages + api)
      globals.css        # global styles
      layout.tsx         # root layout — providers, head tags
      page.tsx           # main UI (landing / chat view)
      favicon.ico
      api/               # server API routes
        signUp/
        verify-code/
        auth/
        send-message/
        get-message/
        accept-messages/
        suggest-message/
        unique-username/
    components/          # UI components
      messageCard.tsx    # message rendering
      navbar.tsx         # navigation
      ui/                # small UI primitives
    context/             # React contexts (auth/chat state)
    helpers/             # utility functions
    lib/                 # reusable library code (clients, services)
    model/               # data models or in-memory stores
    schemas/             # validation schemas
    types/               # shared TypeScript types

```

How it fits together:
- The React UI in src/app/page.tsx uses components to render messages and relies on context providers for auth and chat state.
- Client code calls API routes in src/app/api to sign up users, verify codes, send messages, and fetch messages. Server-side code uses schemas to validate requests and model/ helpers for data operations.
- proxy.ts centralizes outbound HTTP calls to external services (email, SMS, suggestion/AI providers).


## Architecture & data flow
1. User opens the app (page.tsx), picks a username, and requests a verification code via /api/signUp.
2. Backend issues a code (or forwards to an email/SMS provider) and stores the pending sign-up (short-lived) or returns a token to verify.
3. User submits the code to /api/verify-code, which finalizes sign-up and returns a session token or cookie.
4. Once authenticated anonymously, the client uses /api/send-message to post messages. Messages are stored or routed via the model layer.
5. Client polls or fetches messages from /api/get-message. Suggestion, acceptance, and uniqueness checks are handled by their respective endpoints.

Note: The project appears intentionally small and may use in-memory storage for messages during prototyping. For production use, swap to a persistent store (Postgres, Redis, DynamoDB) and add background cleanup for ephemeral messages.


## API reference (summary & examples)
Below are concise examples and suggested request/response shapes inferred from the API route names. Check the exact source files under src/app/api for definitive schemas.

Common headers:
- Content-Type: application/json
- Authorization: Bearer <token> (if auth uses JWT)

1) POST /api/signUp
- Purpose: start sign-up and request a verification code
- Body (JSON): { "username": "anon123", "contact": "user@example.com" }
- Success (200): { "ok": true, "message": "verification sent" }

Example curl:
```
curl -X POST /api/signUp \
  -H "Content-Type: application/json" \
  -d '{"username":"octo_user","contact":"user@example.com"}'
```

2) POST /api/verify-code
- Purpose: verify the sign-up code and return a session token
- Body: { "username": "anon123", "code": "123456" }
- Success (200): { "ok": true, "token": "<jwt-or-session-id>", "username": "anon123" }

3) GET /api/unique-username?username=anon123
- Purpose: check username availability
- Success: { "available": true }

4) POST /api/send-message
- Purpose: post an anonymous message
- Body: { "to": "room-or-user-id", "text": "Hello" }
- Success: { "ok": true, "messageId": "...", "createdAt": "..." }

5) GET /api/get-message?room=<room>&since=<timestamp>
- Purpose: fetch messages (or latest messages)
- Success: { "messages": [ {"id":"...","from":"anon123","text":"...","createdAt":"..."}, ... ] }

6) POST /api/suggest-message
- Purpose: return a suggested reply (AI or template-based)
- Body: { "context": "short conversation text" }
- Success: { "suggestion": "Reply text" }

7) POST /api/accept-messages
- Purpose: accept/acknowledge messages (used for moderation flows)
- Body: { "ids": ["msg1","msg2"] }
- Success: { "accepted": ["msg1"] }

These examples are intentionally generic — inspect the concrete route files to copy exact request/response fields and validation rules.


## Local development
1. Clone and open the Next.js app directory:

```
git clone https://github.com/sayantanpal9/expert-octo-parakeet.git
cd expert-octo-parakeet/nextjs/next-p
```

2. Install dependencies:
```
npm install
# or pnpm/yarn if preferred
```

3. Create environment file:
```
cp .env.example .env.local
# edit .env.local with required variables (see below)
```

4. Start the app in development mode:
```
npm run dev
```
Open http://localhost:3000

Build and start (production-like):
```
npm run build
npm start
```


## Recommended environment variables
Create a .env.local with these recommended variables. Remove or change ones that are not used by your specific implementation.

- NEXT_PUBLIC_APP_NAME=Octo Chat
- NEXT_PUBLIC_BASE_URL=http://localhost:3000
- NEXT_PUBLIC_API_URL=http://localhost:3000/api
- DATABASE_URL=postgres://user:pass@localhost:5432/octo_chat (if using Postgres)
- REDIS_URL=redis://localhost:6379 (if using Redis for ephemeral storage / pubsub)
- JWT_SECRET=replace-with-a-long-random-secret
- SMTP_HOST=smtp.example.com
- SMTP_PORT=587
- SMTP_USER=
- SMTP_PASS=
- EMAIL_FROM="Octo Chat <no-reply@example.com>"
- SUGGESTION_API_KEY= (if using third-party AI)

Note: Keep secrets out of the browser — do NOT expose server-only secrets as NEXT_PUBLIC_ variables.


## Deployment
- Vercel: The app is compatible with Vercel. If your repository is a monorepo, set the project root to /nextjs/next-p and configure environment variables on Vercel.
- Docker: You can containerize the app. Example Dockerfile (outline):

```
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
RUN npm run build
CMD ["npm","start"]
```

When deploying, ensure production environment variables (JWT_SECRET, SMTP creds, DB URL, etc.) are configured.


## Security, privacy & moderation
Because Octo Chat is anonymous, the following practices are recommended:
- Data minimization: store only what is needed (timestamp, message body, pseudonymous id). Avoid storing IP addresses, metadata, or contact details unless necessary.
- Rate limiting: protect endpoints such as /api/send-message and /api/signUp to prevent spam.
- Moderation: implement text filtering or human review workflow for reported messages.
- TLS: always run behind HTTPS in production and set secure cookies.
- Token hygiene: sign tokens properly (JWT_SECRET) and set short expirations for ephemeral sessions.
- Data retention: implement TTL for ephemeral messages and background purging.


## Testing & linting
- Linting: ESLint is configured (eslint.config.mjs). Run:
```
npm run lint
```
- Tests: Add unit/integration tests using Jest or Vitest. Focus tests on:
  - API validation and route behavior
  - helper functions and proxy behavior
  - components (React Testing Library)


## Roadmap & ideas
- Add WebSocket or Server-Sent Events for real-time messaging (replace polling)
- Implement message TTL and background cleanup worker
- Add a basic moderation pipeline and user reporting flow
- Add persistence adapters (Postgres, Redis) with a clear data model
- Improve suggestions by integrating a small LLM or templating engine


## Contributing
1. Fork the repository
2. Create a feature branch: git checkout -b feat/my-feature
3. Run tests and lints locally
4. Open a PR with a clear description and link to issues

Please follow TypeScript types, add tests for behavioral changes, and update this README if you add or change API routes.


## Troubleshooting & FAQ
Q: App doesn't start, missing env variables?
A: Check .env.local and ensure required variables (JWT_SECRET, SMTP or DB vars) are present. Review server logs for specific errors.

Q: I get CORS errors talking to third-party APIs?
A: Use proxy.ts for server-side calls to avoid exposing secrets and to bypass client-side CORS restrictions.

Q: Where are messages stored?
A: By default, the prototype may use an in-memory store (look at src/model). For production, wire a DB/Redis in the model layer and update the configuration.


## Credits & license
- Author: sayantanpal9 (see repository)
- License: Please add a LICENSE file. MIT is recommended for open-source usage.

---

If you want, I can now:
- add a .env.example file to this repo with the specific keys listed above,
- expand the API reference with exact request/response shapes by reading each file under src/app/api and documenting them, or
- create a CONTRIBUTING.md and CODE_OF_CONDUCT.md to formalize contribution rules.
