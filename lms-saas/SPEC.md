# PHASE 1 — FOUNDATION + LANDING

---

# OBJECTIVE

Deliver:

- Public landing page
- Pricing page
- Organization signup
- Email/password authentication
- JWT token system
- Session management
- Org creation
- Trial initialization (30 days)
- Dashboard shell
- Role scaffolding
- UI design token system
- Soft delete system implemented

After Phase 1:

A user must be able to:

- Visit landing
- Create organization
- Become Org Admin
- Login securely
- Access dashboard
- Have 30-day trial active

---

# PHASE 1 FUNCTIONAL REQUIREMENTS

## 1. Landing Page (Public)

Routes:

- /
- /pricing
- /login
- /signup

Landing must include:

- Hero section
- Feature overview
- Pricing tiers (static display)
- CTA buttons
- FAQ
- Login / Signup buttons

No animations required.
Premium UI via spacing + typography.

---

## 2. Organization Signup Flow

Flow:

1. User enters:
    - Organization name
    - Email
    - Password
2. System:
    - Creates Organization
    - Creates User
    - Creates Membership (role = ORG_ADMIN)
    - Creates Subscription (trial mode)
    - Sets trialEndDate = now + 30 days
3. Logs user in immediately.

Constraints:

- Organization name must be unique.
- Email must be unique.
- Password minimum 8 characters.

---

## 3. Authentication System

Endpoints:

- POST /api/auth/login
- POST /api/auth/signup
- POST /api/auth/refresh
- POST /api/auth/logout

Login:

- Validate password
- Issue access token
- Issue refresh token
- Store hashed refresh token
- Create session record

Refresh:

- Validate refresh token
- Rotate token
- Issue new access token

Logout:

- Revoke refresh token
- Invalidate session

---

## 4. Session Table

Must store:

- id
- userId
- organizationId
- deviceInfo
- ipAddress
- refreshTokenHash
- revoked
- lastActiveAt
- createdAt

Used for:

- Multi-session support
- Session revocation

---

## 5. Dashboard Shell

After login:

Role-based redirect:

- ORG_ADMIN → /dashboard/org-admin
- SYSTEM_ADMIN → /dashboard/system-admin

Dashboard must include:

- Sidebar
- Top navigation
- Placeholder sections:
    - Overview
    - Courses
    - Cohorts
    - Settings

No full features yet.
Only structure.

---

## 6. Trial Logic

Subscription table must include:

- organizationId
- status (TRIAL | ACTIVE | EXPIRED)
- trialStartDate
- trialEndDate
- seatLimit
- activeSeatCount

On every protected action:

- Check if trial expired
- If expired:
    - Enable view-only mode
    - Block mutation endpoints

---

## 7. Middleware

Global middleware must:

- Decode access token
- Attach user context
- Validate organization scoping
- Redirect unauthenticated users

---

# NON-FUNCTIONAL REQUIREMENTS

- All APIs typed.
- Strict TypeScript.
- No `any` types.
- ESLint enforced.
- Environment variables validated.
- Prisma migrations must be used.
- Database indexing for:
    - organizationId
    - userId
    - email
    - subscription status

---

# PHASE 1 DELIVERABLES

At completion:

1. Landing page production-ready.
2. Org signup working.
3. Login + refresh working.
4. JWT stored in HttpOnly cookies.
5. Session tracking functional.
6. Trial auto-created.
7. Dashboard layout visible.
8. Soft delete implemented.
9. Modular structure enforced.
10. UI config system active.

---

# ACCEPTANCE CRITERIA

Phase 1 is complete only if:

- No business logic exists inside route handlers.
- No hardcoded UI colors exist.
- All DB models contain organizationId where required.
- Soft delete filtering exists in all queries.
- Access token expires correctly.
- Refresh token rotates correctly.
- Trial expiration can be simulated manually.
- Org admin cannot access system-admin routes.
- System admin can access all organizations.

---

# END OF PHASE 1 SPEC

```

---

This Phase 1 spec establishes the backbone.

If this is implemented cleanly, the rest of the system becomes additive rather than corrective.

Now review this structure carefully.

If you approve, we proceed to:

Phase 1 — Detailed Technical Blueprint
(Prisma schema draft + token structure + service layer contracts + API contracts + middleware design)

And we build it like engineers, not hopeful hackers.
```
