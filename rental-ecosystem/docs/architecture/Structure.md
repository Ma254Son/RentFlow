# Rental Ecosystem — GitHub Repository Structure

---

## Monorepo Structure

```
rental-ecosystem/
│
├── apps/
│   ├── mobile-tenant/              # React Native (Expo)
│   ├── web-portal/                 # React / Next.js # uses role permissions
│   └── web-admin/                  # Admin dashboard
│
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── properties/
│   │   │   ├── home-id/
│   │   │   ├── requests/
│   │   │   ├── tenancy/
│   │   │   ├── messaging/
│   │   │   ├── maintenance/
│   │   │   ├── notifications/
│   │   │   └── audit/
│   │   │
│   │   ├── common/
│   │   │   ├── guards/             # JWT + RBAC guards
│   │   │   ├── decorators/
│   │   │   ├── filters/
│   │   │   ├── interceptors/
│   │   │   └── utils/
│   │   │
│   │   ├── config/
│   │   │   ├── database.config.ts
│   │   │   ├── redis.config.ts
│   │   │   └── env.config.ts
│   │   │
│   │   ├── prisma/                 # Prisma schema + migrations
│   │   │   ├── schema.prisma
│   │   │   └── migrations/
│   │   │
│   │   ├── app.module.ts
│   │   └── main.ts
│   │
│   ├── test/
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
│
├── packages/
│   ├── shared-types/               # Shared TypeScript types
│   ├── ui-components/              # Shared UI components (optional)
│   ├── utils/                      # Shared helpers (formatting, etc.)
│   └── api-client/                 # Axios / React Query wrappers
│
├── infra/
│   ├── docker/
│   │   ├── docker-compose.yml
│   │   ├── postgres.yml
│   │   └── redis.yml
│   │
│   ├── nginx/
│   └── scripts/
│
├── docs/
│   ├── PRD/
│   ├── architecture/
│   └── api-specs/
│
├── .github/
│   └── workflows/
│       ├── backend-ci.yml
│       ├── frontend-ci.yml
│       └── deploy.yml
│
├── .env.example
├── README.md
├── package.json
├── turbo.json                      # Turborepo config (if using Turborepo)
└── pnpm-workspace.yaml
```

---

## Why This Structure Works

### 1. Monorepo Advantage

Everything lives in one place — mobile app, web apps, backend, and shared logic.

This is critical for this system because:

- Tenant, landlord, and agent apps all share common logic
- The Home ID system must behave consistently across every client
- A single repository means a single source of truth

---

### 2. Backend Module Design

Each module is **independent and scalable.** Key modules and their responsibilities:

**`home-id/`**
- Generate Home ID
- Validate Home ID
- Link tenant to property

**`requests/`**
- Tenant request creation
- Approval workflow
- Rejection logic
- OTP trigger

**`tenancy/`**
- Active tenancy creation
- Move-in / move-out logic
- One-active-home enforcement

This makes the backend easy to **maintain**, easy to **scale**, and easy to **test**.

---

### 3. Shared Packages Layer

The `packages/` directory is what makes this system enterprise-grade:

| Package | Contents |
|---|---|
| `shared-types` | User types, property types, API response types |
| `api-client` | Axios instance, React Query hooks, centralized API calls |
| `utils` | Date formatting, phone validation, ID generators |

---

### 4. Infrastructure Layer

The `infra/` directory is the **production readiness layer:**

- Docker setup for local and production environments
- PostgreSQL + Redis container configs
- CI/CD pipeline definitions
- Deployment scripts

---

### 5. Development Build Order

Build the system in this sequence:

| Step | Focus |
|---|---|
| **Step 1** | Backend — modules first |
| **Step 2** | Shared types + API client |
| **Step 3** | Tenant mobile app |
| **Step 4** | Landlord + Agent dashboards |
| **Step 5** | Admin panel |

---

### 6. Engineering Philosophy

This repository is designed around three core principles:

**Scalability**
New modules — payments, AI, analytics — can be added without breaking existing functionality.

**Separation of Concerns**
No mixed logic between apps. Each client and module owns its domain.

**Reusability**
Shared packages prevent duplication and keep logic consistent across all clients.

---

*Rental Ecosystem — Repository Structure v1.0*