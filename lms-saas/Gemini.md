````md
# Cohort SaaS Platform — Engineering Rules & Phase 1 Specification

---

# TECH STACK (LOCKED)

The following stack is mandatory unless explicitly revised.

## Core Framework

- Next.js (App Router)
- Full-stack usage (frontend + API routes)

## Language

- TypeScript (strict mode enabled)

## Database

- PostgreSQL

## ORM

- Prisma

## Authentication

- Custom email/password authentication
- JWT access tokens (15 min expiry)
- Rotating refresh tokens
- HttpOnly cookies

## Payments

- Razorpay (India-first)

## Video Infrastructure

- 100ms (SDK integration in later phase)

## Styling

- Tailwind CSS
- Centralized UI design token system via `/config/ui.config.ts`

## State Management

- React Server Components where possible
- Minimal client state
- No global state library in Phase 1

## Deployment Target

- Vercel (frontend + API routes)
- Managed PostgreSQL (Neon / Supabase / RDS)

## Background Jobs (Later Phases)

- Node-based scheduled jobs (no external queue in Phase 1)

## Email Service (Phase 1 Minimal)

- SMTP or transactional provider (Resend / SendGrid) I prefer using smtp
- Used for verification + basic communication

# GLOBAL ENGINEERING PRINCIPLES

These rules apply to ALL phases and must never be violated.

## 1. Multi-Tenancy Enforcement

- Every major table must include `organizationId`.
- All queries must scope by `organizationId`.
- No cross-organization data leakage.
- System Admin is the only role allowed to query across organizations.

---

## 2. Soft Delete Policy

All major entities must include:

```ts
deletedAt DateTime? @db.Timestamp(6)
```
````

Entities requiring soft delete:

- Organization
- User
- Course
- Subject
- Cohort
- Enrollment
- Session
- Subscription

Rules:

- Never hard delete production records.
- All read queries must include:
  where: { deletedAt: null }
- Soft delete must update deletedAt timestamp.
- Unique constraints must account for soft delete when necessary.

---

## 3. Codebase Modularity Rules

Never mix concerns.

### UI Layer

- Pure presentation only.
- No database calls.
- No business logic.

### Service Layer

- All business logic.
- Seat validation.
- Role validation.
- Trial validation.

### Repository Layer

- Direct Prisma calls only.
- No business logic.

### API Routes

- Call services.
- Return formatted response.
- Never contain business logic.

---

## 4. Authentication Rules

Authentication system must include:

- Email + Password login
- JWT Access Token (15 minutes)
- Refresh Token (rotating)
- HttpOnly secure cookies
- Hashed refresh tokens stored in DB
- Session table for device tracking

Access Token Payload:

- userId
- organizationId
- role
- tokenVersion

Refresh Token:

- Rotated on every refresh
- Revoked on logout
- Stored hashed

Multiple sessions:

- Admins & instructors: allowed
- Students: configurable (default allow)

---

## 5. Security Requirements

- Passwords hashed using bcrypt (min 12 rounds)
- Rate limit login endpoint
- CSRF protection for mutations
- Input validation via schema validation (Zod)
- No raw SQL queries
- No unsafe token storage in localStorage
- Access token stored in HttpOnly cookie

---

## 6. UI System Rules

Create a single source of truth:

`/config/ui.config.ts`

Must include:

- color tokens (primary, accent, neutral)
- border radius scale
- spacing scale
- typography scale
- shadow presets
- dark mode tokens

Rules:

- No hardcoded colors in components.
- No inline styles unless dynamic.
- All components consume design tokens.
- Use consistent spacing system.
- Layout components must be reusable.

---

## 7. Folder Structure

Must follow:

app/
(marketing)
(auth)
(dashboard)
/api

config/
lib/
server/
types/
components/

Business logic must live in:

server/services/
server/repositories/
