# Database Design
## Rental Ecosystem Platform — PRD Part 5

---

## 1. Overview

The system is built around a multi-role, property-centric model where:

- **Users** = tenants, landlords, agents
- **Properties** = central entity
- **Home ID** = secure property identifier
- **Requests** = connection workflow
- **Audit logs** = system traceability

---

## 2. Core Tables

### 2.1 Users Table

Stores all platform users (tenant, landlord, agent, admin).

**Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `full_name` | STRING | User's full name |
| `phone_number` | STRING | Unique, used for login/OTP |
| `email` | STRING | Nullable, unique |
| `password_hash` | STRING | Securely hashed |
| `role` | ENUM | `tenant` \| `landlord` \| `agent` \| `admin` |
| `is_verified` | BOOLEAN | Phone/email verified |
| `kyc_status` | ENUM | `pending` \| `approved` \| `rejected` |
| `profile_photo` | STRING | URL to photo (nullable) |
| `created_at` | TIMESTAMP | Record creation |
| `updated_at` | TIMESTAMP | Last update |

---

### 2.2 Properties Table

Represents rental units (core entity).

**Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `owner_id` | UUID | FK → Users (landlord) |
| `agent_id` | UUID | FK → Users (nullable) |
| `title` | STRING | Property name/title |
| `description` | TEXT | Full description |
| `location` | TEXT/GEO | Address or coordinates |
| `rent_amount` | DECIMAL | Monthly rent in KES |
| `bedrooms` | INTEGER | Number of bedrooms |
| `bathrooms` | INTEGER | Number of bathrooms |
| `amenities` | JSON | Array of amenities |
| `status` | ENUM | `vacant` \| `occupied` \| `reserved` \| `maintenance` |
| `home_id` | STRING | Unique property identifier |
| `created_at` | TIMESTAMP | Record creation |
| `updated_at` | TIMESTAMP | Last update |

---

### 2.3 Property Media Table

Stores images/videos for properties.

**Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `property_id` | UUID | FK → Properties |
| `media_type` | ENUM | `image` \| `video` |
| `url` | STRING | CDN/cloud storage URL |
| `created_at` | TIMESTAMP | Upload time |

---

### 2.4 Home Connection Requests Table

Handles tenant → property joining flow.

**Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `property_id` | UUID | FK → Properties |
| `tenant_id` | UUID | FK → Users (tenant) |
| `status` | ENUM | `pending` \| `approved` \| `rejected` \| `expired` \| `verified` |
| `otp_code` | STRING | Hashed OTP |
| `otp_expires_at` | TIMESTAMP | Expiry time |
| `created_at` | TIMESTAMP | Request time |
| `updated_at` | TIMESTAMP | Last update |

---

### 2.5 Tenancy Table (Active Residents)

Represents confirmed tenant-property relationship.

**Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `property_id` | UUID | FK → Properties |
| `tenant_id` | UUID | FK → Users |
| `move_in_date` | DATE | Move-in date |
| `move_out_date` | DATE | Nullable, if ended |
| `rent_amount_snapshot` | DECIMAL | Rent at move-in |
| `status` | ENUM | `active` \| `ended` |
| `created_at` | TIMESTAMP | Record creation |

---

### 2.6 Maintenance Requests Table

Tracks issues reported by tenants.

**Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `property_id` | UUID | FK → Properties |
| `tenant_id` | UUID | FK → Users |
| `title` | STRING | Issue title |
| `description` | TEXT | Full description |
| `status` | ENUM | `open` \| `in_progress` \| `resolved` |
| `created_at` | TIMESTAMP | Reported time |
| `updated_at` | TIMESTAMP | Last update |

---

### 2.7 Messages Table (Chat System)

**Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `sender_id` | UUID | FK → Users |
| `receiver_id` | UUID | FK → Users |
| `property_id` | UUID | FK → Properties (nullable) |
| `message` | TEXT | Message content |
| `created_at` | TIMESTAMP | Sent time |

---

### 2.8 Audit Logs Table (Critical)

Tracks all system actions.

**Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `user_id` | UUID | FK → Users (nullable) |
| `action_type` | STRING | e.g., `login`, `approve_tenant`, `create_property` |
| `entity_type` | STRING | `user` \| `property` \| `request` \| `tenancy` |
| `entity_id` | UUID | ID of affected entity |
| `metadata` | JSON | Additional context |
| `created_at` | TIMESTAMP | Action timestamp |

---

## 3. Relationships Summary

| Relationship | Type |
|--------------|------|
| User (Owner) → Properties | One-to-Many |
| User (Agent) → Properties | One-to-Many |
| Property → Media | One-to-Many |
| Property → Connection Requests | One-to-Many |
| Property → Tenancy | One-to-One (active) |
| User (Tenant) → Tenancy | One-to-One (active) |
| Property → Maintenance Requests | One-to-Many |
| User (Sender) → Messages | One-to-Many |
| User (Receiver) → Messages | One-to-Many |

---

## 4. Key System Rules Enforced in DB

### Rule 1: One Active Home Per Tenant
Enforced via Tenancy table constraint (only one `active` status per tenant).

### Rule 2: Unique Home ID
`properties.home_id` must be UNIQUE across all properties.

### Rule 3: OTP Security
OTP stored hashed, expires quickly (5–10 minutes).

### Rule 4: Audit Integrity
All critical actions must generate an audit log entry.

---

## 5. Design Philosophy

- **Properties** are the central object
- **Users** are role-based actors
- **Tenancy** is a state, not a permanent relationship
- **Requests** are temporary workflow objects
- **Audit logs** ensure full traceability

---
