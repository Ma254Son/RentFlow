# Rental Ecosystem — Database ER Diagram (V1)

---

## Entity Relationship Diagram

```
┌─────────────────────┐
│       User          │
├─────────────────────┤
│ id                  │
│ fullName            │
│ phoneNumber         │
│ email               │
│ role                │
│ kycStatus           │
│ deletedAt           │
└─────────┬───────────┘
          │
          │ owns
          ▼

┌─────────────────────┐
│      Property       │
├─────────────────────┤
│ id                  │
│ ownerId             │
│ name                │
│ county              │
│ town                │
│ estate              │
│ deletedAt           │
└─────────┬───────────┘
          │
          │ contains
          ▼

┌─────────────────────┐
│    PropertyUnit     │
├─────────────────────┤
│ id                  │
│ propertyId          │
│ unitNumber          │
│ homeId              │
│ rentAmount          │
│ bedrooms            │
│ bathrooms           │
│ status              │
│ deletedAt           │
└───┬─────┬───────────┘
    │     │
    │     │
    │     ▼
    │
    │   ┌─────────────────────┐
    │   │   PropertyMedia     │
    │   ├─────────────────────┤
    │   │ id                  │
    │   │ unitId              │
    │   │ mediaType           │
    │   │ url                 │
    │   └─────────────────────┘
    │
    │   ┌─────────────────────┐
    │   │ HomeConnectionReq   │
    │   ├─────────────────────┤
    │   │ id                  │
    │   │ tenantId            │
    │   │ unitId              │
    │   │ status              │
    │   │ otpHash             │
    │   └─────────┬───────────┘
    │             │
    │             │ belongs to
    │             ▼
    │
    │   ┌─────────────────────┐
    │   │       User          │
    │   │     (Tenant)        │
    │   └─────────────────────┘
    │
    ▼

┌─────────────────────┐
│      Tenancy        │
├─────────────────────┤
│ id                  │
│ unitId              │
│ tenantId            │
│ moveInDate          │
│ moveOutDate         │
│ status              │
└──────┬──────────────┘
       │
       │ tenant
       ▼

┌─────────────────────┐
│       User          │
│     (Tenant)        │
└─────────────────────┘


┌─────────────────────┐
│ MaintenanceRequest  │
├─────────────────────┤
│ id                  │
│ unitId              │
│ tenantId            │
│ title               │
│ status              │
└─────────────────────┘


┌─────────────────────┐
│ PropertyAssignment  │
├─────────────────────┤
│ id                  │
│ propertyId          │
│ agentId             │
│ status              │
└──────┬──────────────┘
       │
       ▼

┌─────────────────────┐
│       User          │
│      (Agent)        │
└─────────────────────┘


┌─────────────────────┐
│    KycDocument      │
├─────────────────────┤
│ id                  │
│ userId              │
│ documentType        │
│ status              │
└──────┬──────────────┘
       │
       ▼
      User


┌─────────────────────┐
│   RefreshToken      │
├─────────────────────┤
│ id                  │
│ userId              │
│ tokenHash           │
│ expiresAt           │
└──────┬──────────────┘
       │
       ▼
      User


┌─────────────────────┐
│    Notification     │
├─────────────────────┤
│ id                  │
│ userId              │
│ title               │
│ type                │
│ isRead              │
└──────┬──────────────┘
       │
       ▼
      User


┌─────────────────────┐
│   PropertyViewing   │
├─────────────────────┤
│ id                  │
│ tenantId            │
│ unitId              │
│ scheduledFor        │
│ status              │
└─────────────────────┘


┌─────────────────────┐
│      Message        │
├─────────────────────┤
│ id                  │
│ senderId            │
│ receiverId          │
│ unitId              │
│ content             │
└─────────────────────┘


┌─────────────────────┐
│      AuditLog       │
├─────────────────────┤
│ id                  │
│ userId              │
│ actionType          │
│ entityType          │
│ entityId            │
│ metadata            │
└─────────────────────┘
```

---

## Important Relationship Rules

### Property → PropertyUnit

One Property can have many Units. One Unit belongs to exactly one Property.

```
Sunrise Apartments
├── Unit A1
├── Unit A2
├── Unit A3
└── Unit B1
```

---

### PropertyUnit → Home ID

Every Unit gets its own Home ID. Home IDs are globally unique across the entire platform.

```
A1  →  HM-SUN-001
A2  →  HM-SUN-002
A3  →  HM-SUN-003
```

---

### Tenant → Tenancy

- A tenant can only have **one active tenancy** at a time.
- Historical tenancy records are **preserved** and never deleted.

---

### Property → Agent

Managed through the `PropertyAssignment` table:

- Agents can manage **multiple properties.**
- Properties can **switch agents** over time.
- Each assignment has its own `status` to track history.

---

## Audit Log Events

Every critical action in the system creates an audit log record:

| Event | Trigger |
|---|---|
| Tenant requested Home ID | `HomeConnectionReq` created |
| Agent approved request | Request status updated to `approved` |
| OTP sent | OTP generated and dispatched via SMS |
| OTP verified | Tenant submits valid OTP code |
| Tenancy created | Active tenancy record inserted |
| Move-out completed | Tenancy status set to `closed` |

---

## Entity Summary

| Entity | Purpose |
|---|---|
| `User` | All platform users — tenants, landlords, agents, admins |
| `Property` | A property owned by a landlord, containing multiple units |
| `PropertyUnit` | An individual rentable unit within a property |
| `PropertyMedia` | Images and videos attached to a unit |
| `HomeConnectionReq` | A tenant's request to connect to a unit via Home ID |
| `Tenancy` | An active or historical rental relationship |
| `MaintenanceRequest` | A repair or issue raised by a tenant for a unit |
| `PropertyAssignment` | Links an agent to a property they manage |
| `KycDocument` | Identity verification documents submitted by a user |
| `RefreshToken` | Stored token hash for session management |
| `Notification` | In-app alerts sent to users |
| `PropertyViewing` | Scheduled viewing appointments for a unit |
| `Message` | Direct messages between users in the context of a unit |
| `AuditLog` | Immutable record of every critical system action |

---

*Rental Ecosystem — Database Schema v1.0*