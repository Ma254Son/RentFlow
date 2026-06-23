# User Roles & Permissions
## Rental Ecosystem Platform — PRD Part 2

---

## 1. Overview

The platform has four core roles:

- **Tenant** (Mobile App)
- **Property Owner / Landlord** (Web App)
- **Property Manager / Agent** (Web App)
- **System Admin** (Internal Control)

Each role has clearly defined permissions to ensure security, accountability, and a structured rental lifecycle.

---

## 2. Tenant (Mobile App)

**Purpose:**  
To discover, connect to, and manage rented homes.

### Permissions

#### A. Discovery Phase
- Search available properties
- View property details (photos, videos, amenities, location)
- Save/favorite properties
- Request viewing appointments
- Send Home ID connection request

#### B. Connection Phase
- Submit Home ID request
- View verification status
- Enter verification code (OTP)
- Connect to a single active home only

#### C. Living Phase (Connected Tenant)
- View rent details
- Receive notices and announcements
- Submit maintenance requests
- Communicate with landlord/agent
- View tenancy status
- Request move-out (disconnect request)

### Restrictions
- Cannot edit property details
- Cannot access other tenants' data
- Cannot connect to more than one home at a time
- Cannot approve or reject requests

---

## 3. Property Owner / Landlord (Web App)

**Purpose:**  
To manage owned properties and rental income.

### Permissions
- Create and manage property profiles
- Generate and manage Home IDs
- Assign property managers (agents)
- Approve or reject tenant connection requests
- View tenant details within their properties
- Mark property status:
  - Vacant
  - Occupied
  - Reserved
  - Under maintenance
- View rent records and payment summaries
- Manage tenant move-in and move-out lifecycle
- Access audit logs for their properties

### Restrictions
- Cannot manage properties they do not own
- Cannot access other landlords' data
- Cannot modify tenant identity verification data

---

## 4. Property Manager / Agent (Web App)

**Purpose:**  
To handle operational management of assigned properties.

### Permissions
- View assigned properties only
- Manage property availability status (vacant/occupied)
- Handle tenant requests (viewing, maintenance, inquiries)
- Respond to tenant messages
- Schedule viewings
- Update property listings (if permitted by owner)
- View tenant occupancy status
- Assist in tenant onboarding (Home ID approval flow)

### Restrictions
- Cannot create property ownership
- Cannot transfer ownership
- Cannot access financial ownership settings of landlord
- Cannot assign themselves to properties

---

## 5. System Admin (Internal Platform Control)

**Purpose:**  
To manage platform integrity, security, and compliance.

### Permissions
- Verify landlords and agents (KYC/identity checks)
- Approve or suspend accounts
- Monitor platform activity logs
- Resolve disputes
- Manage system-wide settings
- Remove fraudulent listings or users
- Access full audit logs
- Enforce compliance rules

### Restrictions
- Cannot interfere with private tenant-landlord agreements unless required for dispute resolution

---

## 6. Key Permission Rules (System Logic)

### Rule 1: Single Active Home Connection
A tenant can only be connected to one Home ID at a time.

### Rule 2: Ownership Separation
Property Owner ≠ Property Manager (Agent)  
They are always independent entities.

### Rule 3: Approval Requirement
No tenant becomes connected to a property without:
- Owner/Agent approval
- OTP verification completion

### Rule 4: Audit Logging
All actions are logged:
- Property creation
- Home ID generation
- Tenant requests
- Approvals/rejections
- OTP verification
- Move-in / move-out events

---

## 7. System Philosophy

- **Tenants** = Users of homes
- **Landlords** = Owners of assets
- **Agents** = Operators of properties
- **Admin** = Guardian of system trust

The system enforces **trust, traceability, and controlled access** at every level.
