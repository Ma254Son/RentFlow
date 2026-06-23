# User Flows
## Rental Ecosystem Platform — PRD Part 3

---

## 1. Tenant Flow (Mobile App)

### A. Onboarding Flow
1. Open app
2. Register (phone/email + verification)
3. Choose path:
   - "Find a Home"
   - "I already have a Home"

### B1. Find a Home Flow (Discovery Mode)
1. Tenant enters discovery dashboard
2. Searches/filters properties:
   - Location
   - Budget
   - Bedrooms
3. Views property details:
   - Photos/videos
   - Amenities
   - Rent
   - Availability
4. Actions:
   - Save property
   - Request viewing
   - Start chat with landlord/agent

### B2. Home Connection Flow (Living Mode Entry)
1. Tenant selects: → "I already have a Home"
2. Enters Home ID
3. System sends request to landlord/agent
4. Landlord/agent:
   - Approves or rejects request
5. If approved:
   - System sends OTP to tenant phone number
   - Tenant enters OTP
   - System verifies and connects tenant to property
   - Tenant becomes "Active Resident"

### C. Living Mode Flow (After Connection)
1. Tenant dashboard switches to "My Home"
2. Tenant can:
   - View rent details
   - Pay rent (if enabled)
   - Submit maintenance requests
   - Receive announcements
   - Chat with landlord/agent
   - View lease status

### D. Move-Out Flow
1. Tenant requests move-out
2. Landlord/agent confirms exit
3. Property status changes to "Vacant"
4. Tenant is disconnected
5. Home ID becomes available for new tenants

---

## 2. Property Owner (Landlord) Flow

### A. Setup Flow
1. Register account
2. Complete verification (KYC)
3. Create property profile:
   - Name
   - Location
   - Units
   - Amenities
4. Generate Home ID
5. Property becomes active in system

### B. Property Management Flow
1. Landlord dashboard
2. Select property
3. Manage:
   - Status (vacant/occupied)
   - Rent amount
   - Availability
   - Maintenance updates

### C. Tenant Connection Flow
1. Tenant submits Home ID request
2. Landlord receives request:
   - View tenant details
   - Approve / Reject
3. If approved:
   - System triggers OTP to tenant
   - Tenant completes verification → connected

### D. Ongoing Management Flow
1. View tenants per property
2. Track rent status
3. Respond to maintenance requests
4. Assign/replace agent
5. View audit logs

---

## 3. Agent Flow

### A. Registration & Assignment
1. Agent registers
2. Completes verification
3. Receives Agent ID
4. Landlord assigns agent to property

### B. Operational Flow
For each assigned property:
1. View property dashboard
2. Manage listings
3. Handle tenant inquiries
4. Schedule viewings
5. Update availability status
6. Respond to maintenance issues

### C. Tenant Approval Flow (Shared with Landlord)
1. Tenant sends Home ID request
2. Agent reviews tenant details
3. Approves / rejects request
4. If approved:
   - OTP is triggered to tenant phone
   - Tenant completes verification

---

## 4. Admin Flow (System Control)

### A. Verification Flow
1. Review landlord/agent KYC submissions
2. Approve / reject accounts
3. Assign verification status

### B. Monitoring Flow
1. View all platform activity
2. Monitor audit logs
3. Flag suspicious accounts or listings
4. Resolve disputes

---

## 5. Core System Flow Summary

### Tenant Lifecycle:
**Discover → Request → Verify → Live → Exit**

### Property Lifecycle:
**Create → Assign → Occupy → Vacant → Reassign**

### System Principle:
Every action must pass through:
- Identity verification
- Approval step
- Audit logging
