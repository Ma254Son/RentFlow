# Rental Ecosystem Platform — API Design

---

## 1. Overview

The API is designed as a **role-based REST API** supporting:

- Tenant Mobile App
- Landlord Web Dashboard
- Agent Web Dashboard
- Admin Panel

All endpoints are secured using:

- **JWT Authentication**
- **Role-Based Access Control (RBAC)**

---

## 2. Authentication APIs

### Register User

```
POST /api/auth/register
```

**Request Body:**

| Field | Type | Description |
|---|---|---|
| `full_name` | string | User's full name |
| `phone_number` | string | User's phone number |
| `email` | string | User's email address |
| `password` | string | User's password |
| `role` | string | One of: `tenant`, `landlord`, `agent`, `admin` |

---

### Login

```
POST /api/auth/login
```

**Response:**

| Field | Description |
|---|---|
| `access_token` | Short-lived JWT for API access |
| `refresh_token` | Long-lived token to issue new access tokens |
| `user_profile` | Basic user profile data |

---

### Verify Phone (OTP)

```
POST /api/auth/verify-phone
```

**Request Body:**

| Field | Type | Description |
|---|---|---|
| `phone_number` | string | Registered phone number |
| `otp_code` | string | One-time password sent via SMS |

---

## 3. Property APIs

### Create Property

```
POST /api/properties
```

> 🔒 Requires authentication — **Role:** `landlord` | `agent`

**Request Body:**

| Field | Type | Description |
|---|---|---|
| `title` | string | Property listing title |
| `description` | string | Detailed property description |
| `location` | string | Property address or coordinates |
| `rent_amount` | number | Monthly rent in local currency |
| `bedrooms` | integer | Number of bedrooms |
| `bathrooms` | integer | Number of bathrooms |
| `amenities` | array | List of available amenities |

---

### Upload Property Media

```
POST /api/properties/:id/media
```

> 🔒 Requires authentication — **Role:** `landlord` | `agent`

Accepts multipart form data for uploading images and/or videos tied to a specific property listing.

---

### Get All Properties

```
GET /api/properties
```

> 🔒 Requires authentication — **Role:** `tenant`

**Supported Query Filters:**

| Parameter | Type | Description |
|---|---|---|
| `location` | string | Filter by location or area |
| `rent_min` | number | Minimum rent amount |
| `rent_max` | number | Maximum rent amount |
| `bedrooms` | integer | Number of bedrooms |
| `availability_status` | string | e.g. `available`, `occupied` |

---

### Get Property Details

```
GET /api/properties/:id
```

Returns full details for a single property listing.

---

### Generate Home ID

```
POST /api/properties/:id/generate-home-id
```

> 🔒 Requires authentication — **Role:** `landlord` | `agent`

**Response:**

| Field | Description |
|---|---|
| `home_id` | Unique identifier for the property unit, used by tenants to request connection |

---

## 4. Home Connection APIs

### Request Home Connection

```
POST /api/home-requests
```

> 🔒 Requires authentication — **Role:** `tenant`

**Request Body:**

| Field | Type | Description |
|---|---|---|
| `home_id` | string | The Home ID of the desired property |

Creates a **pending** connection request sent to the property's landlord or agent.

---

### Get Pending Requests

```
GET /api/home-requests?status=pending
```

> 🔒 Requires authentication — **Role:** `landlord` | `agent`

Returns all pending home connection requests for properties managed by the authenticated user.

---

### Approve Request

```
POST /api/home-requests/:id/approve
```

> 🔒 Requires authentication — **Role:** `landlord` | `agent`

**Triggers:**

- OTP generation
- OTP sent to the tenant's registered phone number

---

### Reject Request

```
POST /api/home-requests/:id/reject
```

> 🔒 Requires authentication — **Role:** `landlord` | `agent`

Rejects the pending home connection request and notifies the tenant.

---

### Verify OTP

```
POST /api/home-requests/:id/verify
```

> 🔒 Requires authentication — **Role:** `tenant`

**Request Body:**

| Field | Type | Description |
|---|---|---|
| `otp_code` | string | OTP received on the tenant's phone |

**On Success — Creates:**

- An **active tenancy record** linking the tenant to the property

---

## 5. Tenancy APIs

### Get My Home

```
GET /api/tenancy/me
```

> 🔒 Requires authentication — **Role:** `tenant`

**Response includes:**

| Field | Description |
|---|---|
| `property_details` | Full property info |
| `rent_info` | Rent amount, due date, payment status |
| `status` | Current tenancy status (e.g. `active`, `closing`) |

---

### Move Out Request

```
POST /api/tenancy/move-out
```

> 🔒 Requires authentication — **Role:** `tenant`

Initiates a move-out request, notifying the landlord or agent.

---

### Mark Tenant Move Out

```
POST /api/tenancy/:id/close
```

> 🔒 Requires authentication — **Role:** `landlord` | `agent`

Closes the tenancy record and marks the property as available.

---

## 6. Maintenance APIs

### Create Request

```
POST /api/maintenance
```

> 🔒 Requires authentication — **Role:** `tenant`

**Request Body:**

| Field | Type | Description |
|---|---|---|
| `property_id` | string | ID of the associated property |
| `title` | string | Short summary of the issue |
| `description` | string | Detailed description of the maintenance issue |

---

### Get Requests

```
GET /api/maintenance?property_id=
```

> 🔒 Requires authentication — **Role:** `tenant` | `landlord` | `agent`

Returns all maintenance requests for the specified property.

---

### Update Request Status

```
PATCH /api/maintenance/:id
```

> 🔒 Requires authentication — **Role:** `agent` | `landlord`

Updates the status of a maintenance request (e.g. `pending` → `in_progress` → `resolved`).

---

## 7. Messaging APIs

### Send Message

```
POST /api/messages
```

> 🔒 Requires authentication

**Request Body:**

| Field | Type | Description |
|---|---|---|
| `receiver_id` | string | ID of the message recipient |
| `property_id` | string | Property context for the conversation |
| `message` | string | Message content |

---

### Get Messages

```
GET /api/messages?property_id=
```

> 🔒 Requires authentication

Returns the message thread for a given property between the authenticated user and other parties.

---

## 8. Admin APIs

### Verify User (KYC)

```
POST /api/admin/users/:id/verify
```

> 🔒 Requires authentication — **Role:** `admin`

Marks a user as KYC-verified after identity confirmation.

---

### Suspend User

```
POST /api/admin/users/:id/suspend
```

> 🔒 Requires authentication — **Role:** `admin`

Suspends a user account, revoking platform access.

---

### View Audit Logs

```
GET /api/admin/audit-logs
```

> 🔒 Requires authentication — **Role:** `admin`

Returns a paginated list of system audit log entries.

---

## 9. Audit Log Triggering

The following actions **automatically generate an audit log entry:**

| Action | Trigger |
|---|---|
| Property creation | `POST /api/properties` |
| Home ID generation | `POST /api/properties/:id/generate-home-id` |
| Request approval | `POST /api/home-requests/:id/approve` |
| Request rejection | `POST /api/home-requests/:id/reject` |
| OTP verification | `POST /api/home-requests/:id/verify` |
| Tenancy creation | On successful OTP verification |
| Move-out request | `POST /api/tenancy/move-out` |
| Tenancy closure | `POST /api/tenancy/:id/close` |

---

## 10. Security Rules

| Rule | Details |
|---|---|
| **JWT required** | All protected routes require a valid Bearer token |
| **RBAC enforcement** | Role-based middleware validates permissions per endpoint |
| **OTP expiry** | OTPs expire after **5 minutes** |
| **Rate limiting** | Applied to all authentication endpoints to prevent brute-force |
| **Audit logging** | All sensitive actions are logged with actor, timestamp, and context |

---

## 11. API Design Philosophy

| Principle | Description |
|---|---|
| **Simple REST structure** | Predictable, resource-based URL patterns |
| **Clear role separation** | Each endpoint enforces role-specific access |
| **Property-centric architecture** | Properties are the core resource all other entities relate to |
| **Request-driven tenancy lifecycle** | Tenancy is created only after a verified, approved connection request |
| **Security-first verification model** | OTP verification gates all tenancy activations |

---

*Version 1.0 — Rental Ecosystem Platform Internal API Specification*