# MVP Features
## Rental Ecosystem Platform — PRD Part 4

---

## 1. MVP Goal

To launch a working rental ecosystem that enables:

- Property listing (landlords/agents)
- Home discovery (tenants)
- Secure Home ID connection system
- Basic tenancy management

**Everything else is secondary.**

---

## 2. Tenant (Mobile App) — MVP Features

### Core Features:
- Phone/email registration + verification
- Browse property listings
- Search & filter properties
- View property details (photos, rent, location)
- Save favorites
- Request viewing
- Send Home ID connection request
- OTP verification for Home ID connection
- "My Home" dashboard (after connection)
- View rent details
- Submit maintenance request
- Basic chat with landlord/agent

### Out of MVP (Later):
- Rent payment system
- AI house recommendation
- Community features
- Ratings/reviews
- Visitor management

---

## 3. Property Owner (Landlord) — MVP Features

### Core Features:
- Account registration + KYC verification
- Create property profile
- Generate Home ID
- Upload property details (photos, amenities, rent)
- View tenant connection requests
- Approve / reject tenant requests
- Manage property status (vacant/occupied)
- View tenants per property
- Basic dashboard overview

### Out of MVP:
- Automated rent splitting
- Advanced analytics
- Financial reports
- Multi-property portfolios (advanced UI)
- Rent collection system

---

## 4. Agent (Property Manager) — MVP Features

### Core Features:
- Agent registration + verification
- Receive Agent ID
- View assigned properties
- Handle tenant requests (view/review/approve)
- Update property availability
- Respond to tenant messages
- Schedule viewings

### Out of MVP:
- Commission tracking
- Automated payments
- Performance analytics
- Multi-agent teams

---

## 5. Admin Panel — MVP Features

### Core Features:
- Verify landlords (KYC approval)
- Verify agents
- Manage users (suspend/activate)
- View audit logs
- Flag suspicious listings
- Basic system monitoring dashboard

---

## 6. Core System Features (Critical Infrastructure)

### Must-Have Systems:

#### A. Home ID System
- Unique ID per property
- Permanent property identifier
- Used for tenant connection

#### B. Verification System
- Tenant verification (phone OTP)
- Landlord/agent KYC verification
- OTP-based home connection approval

#### C. One Active Home Rule
- Tenant can only be connected to one property at a time

#### D. Audit Log System
Tracks:
- User registrations
- Home ID generation
- Tenant requests
- Approvals/rejections
- OTP verification
- Move-in/move-out events

---

## 7. MVP Exclusions (Important)

We intentionally avoid:

- Payment processing (Phase 2)
- Agent commission automation
- AI search
- Community/social features
- Ratings/reviews system
- Complex financial dashboards

---

## 8. MVP Success Definition

The MVP is successful if:

- A landlord can list a property and generate a Home ID
- A tenant can discover OR join using Home ID
- Approval + OTP flow works securely
- Tenant becomes "Active Resident"
- Basic maintenance + communication works
- System logs all actions reliably

---

## 9. Product Philosophy (MVP)

- **Simplicity** over features
- **Trust** over speed
- **Structure** over flexibility
- **Security** over convenience (at first)
