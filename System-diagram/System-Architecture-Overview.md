# System Architecture Overview

---

## 1. High-Level Architecture

```
                ┌──────────────────────────────┐
                │        Mobile App            │
                │     (Tenant - React Native)  │
                └──────────────┬───────────────┘
                               │
                               │ REST API / HTTPS
                               ▼
┌────────────────────────────────────────────────────────┐
│                  Backend API (NestJS)                  │
│--------------------------------------------------------│
│  Auth Module      → JWT + OTP Verification             │
│  User Module      → Tenant / Landlord / Agent          │
│  Property Module  → Listings + Home ID System          │
│  Request Module   → Home Connection Flow               │
│  Tenancy Module   → Active Rentals                     │
│  Chat Module      → Messaging                          │
│  Maintenance      → Issue Tracking                     │
│  Audit Module     → Full Activity Logs                 │
└───────────────┬────────────────────────────────────────┘
                │
     ┌──────────┼──────────────────────────┐
     │          │                          │
     ▼          ▼                          ▼
┌──────────┐ ┌──────────────┐ ┌──────────────────┐
│PostgreSQL│ │    Redis     │ │  File Storage    │
│ Database │ │ (Cache + OTP │ │ (S3 / Cloudinary)│
│          │ │  Sessions)   │ │  Images & Videos │
└──────────┘ └──────────────┘ └──────────────────┘
                                       │
                                       ▼
                            ┌─────────────────────┐
                            │ Notification System │
                            │ (FCM / SMS / Email) │
                            └─────────────────────┘


┌──────────────────────────────┐     ┌──────────────────────────────┐
│ Landlord Web App (React)     │     │ Agent Web App (React)        │
│ - Property Management        │     │ - Property Operations        │
│ - Home ID Generation         │     │ - Tenant Handling            │
│ - Approvals                  │     │ - Maintenance Support        │
└──────────────┬───────────────┘     └──────────────┬───────────────┘
               │                                     │
               └──────────────┬──────────────────────┘
                              ▼
                    ┌──────────────────────┐
                    │   Admin Dashboard    │
                    │ - KYC Verification   │
                    │ - System Monitoring  │
                    │ - Audit Logs         │
                    └──────────────────────┘
```

---

## 2. Core Architecture Concept

This system is built around **5 layers:**

### Layer 1 — Client Layer

| Client | Role |
|---|---|
| Tenant Mobile App | Property search, home connection, maintenance requests |
| Landlord Web App | Property management, approvals, Home ID generation |
| Agent Web App | Property operations, tenant handling, maintenance support |
| Admin Panel | KYC verification, system monitoring, audit logs |

### Layer 2 — API Layer *(Brain of the system)*

All business logic lives here. Handles:

- Authentication
- Home ID system
- Tenancy lifecycle
- Requests & approvals
- Messaging
- Maintenance
- Audit logs

### Layer 3 — Data Layer

| Store | Purpose |
|---|---|
| **PostgreSQL** | Structured rental data (users, properties, tenancies) |
| **Redis** | Fast operations — OTP storage, session caching |
| **File Storage** | Property images and videos (S3 / Cloudinary) |

### Layer 4 — Integration Layer

- SMS OTP service
- Email service
- Push notifications (FCM)

### Layer 5 — Trust Layer

> Critical to the platform's integrity.

- KYC verification
- Audit logs
- Role-based access control (RBAC)
- OTP-based tenancy approval

---

## 3. Key Design Insight

> **Your platform is not a listing system.**

It is a **Controlled Property Access System** — meaning:

- Properties are **protected digital assets**
- Access is **granted, not open**
- Every tenant connection is **verified and logged**

---

## 4. Data Flow Example — Tenant Connecting to a Property

```
Tenant → enters Home ID
       → Request sent to API
       → Landlord / Agent approves
       → OTP sent via SMS
       → Tenant verifies OTP
       → Tenancy record created
       → Audit log stored
```

---

## 5. Why This Architecture Works

| Strength | Explanation |
|---|---|
| **Scalable** | Designed to grow into thousands of properties without restructuring |
| **Secure** | OTP verification + KYC checks + role-based access control |
| **Traceable** | Audit logs on every important action across the system |
| **Modular** | Each module is independently extendable without breaking others |
| **Separation of concerns** | Clear boundaries between client, API, data, and integration layers |

---

## 6. Final Mental Model

Think of it as:

> **Airbnb + Banking-level verification + Property management system**

Optimized for the **Kenyan rental reality** — where agents, landlords, and tenants all play distinct, verified roles in the property access lifecycle.

---

*End of Architecture — System Architecture Overview v1.0*