# Rental Ecosystem — Screens & Navigation Structure

---

## Overview

| App | Total Screens | Navigation Style |
|---|---|---|
| Tenant Mobile App | ~20 | Bottom Tab Navigation |
| Web Portal (Landlord + Agent) | ~20 | Left Sidebar |
| Admin Panel | ~12 | Left Sidebar |

---

## 📱 Tenant Mobile App

### Screen Inventory

**Authentication**

1. Splash Screen
2. Welcome / Onboarding
3. Login
4. Register
5. Phone Verification (OTP)

**Entry Point**

6. Choose Journey
   - Find a Home
   - I Already Have a Home

**Discovery**

7. Home Feed / Property Search
8. Search & Filters
9. Property Details
10. Saved Properties
11. Viewing Request

**Home Connection**

12. Enter Home ID
13. Connection Request Submitted
14. OTP Verification (after approval)

**Living Mode**

15. My Home Dashboard
16. Maintenance Requests
17. Create Maintenance Request
18. Notices & Announcements
19. Messages / Chat

**Account**

20. Profile & Settings

---

### Navigation Structure

Bottom Tab Navigation with **5 tabs:**

```
🏠 Home   🔍 Discover   🏡 My Home   💬 Messages   👤 Profile
```

---

#### 🏠 Home Tab

**Purpose:** Landing page after login.

**Shows:**
- Recent properties
- Saved properties shortcut
- Pending viewing requests
- Pending Home ID requests
- Announcements (if connected to a home)

---

#### 🔍 Discover Tab

**Purpose:** House hunting.

**Contains:**
- Search bar
- Filters
- Property listings
- Property details

---

#### 🏡 My Home Tab

**Purpose:** The core tenant experience tab.

**If NOT connected to a home:**

```
Connect to Your Home
[ Enter Home ID ]
```

**If connected:**

```
Unit Information
Rent Information
Maintenance Requests
Announcements
Move Out Request
```

---

#### 💬 Messages Tab

**Contains:**
- Chat with landlord
- Chat with agent

Simple WhatsApp-style messaging interface.

---

#### 👤 Profile Tab

**Contains:**
- Profile details
- Verification status
- Saved properties
- Settings
- Logout

---

---

## 💻 Web Portal — Landlord & Agent

> One application. Role-based navigation.

### Screen Inventory

**Authentication**

1. Login
2. Register
3. Verification / KYC Submission

**Dashboard**

4. Dashboard Overview

**Property Management**

5. Properties List
6. Create Property
7. Property Details
8. Add / Manage Units
9. Unit Details
10. Generate Home ID

**Tenant Management**

11. Connection Requests
12. Tenant Details
13. Active Tenancies

**Operations**

14. Property Viewings
15. Maintenance Requests
16. Messages

**Agent Assignment**

17. Agent Search / Invite
18. Assigned Agents

**Account**

19. Profile
20. Settings

---

### Navigation Structure

Left Sidebar Layout:

```
Dashboard

Properties
 ├─ All Properties
 └─ Units

Tenants
 ├─ Requests
 └─ Active Tenancies

Operations
 ├─ Viewings
 ├─ Maintenance
 └─ Messages

Management
 ├─ Agents
 └─ Occupancy Timeline

Settings
```

---

#### Dashboard

**Shows:**

| Metric | Description |
|---|---|
| Total Properties | All properties under management |
| Total Units | All units across all properties |
| Occupied Units | Units with an active tenancy |
| Vacant Units | Units available for connection |
| Pending Requests | Home connection requests awaiting action |
| Maintenance Overview | Open and in-progress maintenance issues |

---

#### Properties

**All Properties** — lists every property managed by the user:

```
Sunrise Apartments
Green Court
Blue Heights
```

**Units** — lists units within a selected property with status badges:

```
A1  [ Vacant    ]
A2  [ Occupied  ]
A3  [ Reserved  ]
B1  [ Maintenance ]
```

---

#### Tenants

**Requests** — pending Home ID connection requests with actions:

```
[ Approve ]   [ Reject ]
```

**Active Tenancies** — current residents across all managed properties.

---

#### Operations

| Section | Purpose |
|---|---|
| Viewings | Manage scheduled property viewing appointments |
| Maintenance | Track and update maintenance issue statuses |
| Messages | Central communication hub with tenants |

---

#### Management

> **Agents** section is visible to **Landlords only.**

**Agents** — allows the landlord to:
- Search for an agent
- Invite an agent to manage a property
- Remove an agent assignment

**Occupancy Timeline** — historical occupancy records per unit.

---

#### Settings

Profile · KYC · Account Settings

---

---

## 🛡️ Admin Panel

> Admins don't need fancy screens. They need oversight.

### Screen Inventory

**Authentication**

1. Admin Login

**Dashboard**

2. System Overview Dashboard

**User Verification**

3. Landlord Verification Queue
4. Agent Verification Queue
5. User Details Review

**Property Oversight**

6. Property Listings
7. Property Details

**User Management**

8. Users List
9. User Details

**Compliance**

10. Audit Logs
11. Suspended Accounts

**Settings**

12. Platform Settings

---

### Navigation Structure

Left Sidebar Layout:

```
Dashboard

Verification
 ├─ Landlords
 └─ Agents

Properties

Users

Compliance
 ├─ Audit Logs
 └─ Suspended Accounts

Settings
```

---

#### Dashboard

Platform-wide metrics at a glance:

| Metric | Description |
|---|---|
| Total Users | All registered users on the platform |
| Total Properties | All listed properties |
| Total Units | All units across all properties |
| Active Tenancies | Currently occupied units |
| Pending KYC | Verification requests awaiting admin review |

---

#### Verification

> The most important section. Admin spends the majority of time here.

- **Landlords** — review and approve landlord KYC submissions
- **Agents** — review and approve agent KYC submissions

---

#### Properties

Monitor all listed properties. Flag or investigate suspicious listings.

---

#### Users

View and manage all user accounts across every role.

---

#### Compliance

| Section | Purpose |
|---|---|
| Audit Logs | Immutable log of every critical system action |
| Suspended Accounts | View and manage suspended user accounts |

---

*Rental Ecosystem — Screens & Navigation Structure v1.0*