# Technology Stack
## Rental Ecosystem Platform — PRD Part 7

---

## 1. Overview

The platform is designed as a full-stack, API-driven system with:

- Mobile app for tenants
- Web dashboards for landlords, agents, and admin
- Scalable backend API
- Secure database and media storage

---

## 2. Mobile Application (Tenant App)

### Recommended Stack:
- **React Native** (Expo or Bare workflow)
- **TypeScript**
- **React Navigation**
- **Zustand** / Redux Toolkit (state management)
- **React Query** (server state)
- **Axios** / Fetch API

### Why:
- Fast development
- Cross-platform (Android first, iOS later)
- Strong ecosystem
- Fits your current web engineering skills

---

## 3. Web Applications (Landlord / Agent / Admin)

### Recommended Stack:
- **React** (Vite or Next.js)
- **TypeScript**
- **Tailwind CSS**
- **React Query**
- **Zustand** (light state management)

### Optional:
- **Next.js** if you want SSR for SEO property listings

---

## 4. Backend API

### Recommended Stack:
- **Node.js** (NestJS preferred) OR Express (if you want simpler setup)
- **TypeScript**
- **REST API** architecture

### Why NestJS (recommended):
- Built-in structure (controllers/services/modules)
- Easy scaling for large systems
- Great for RBAC (roles: tenant, landlord, agent, admin)
- Good audit logging architecture

---

## 5. Database

### Primary Database:
**PostgreSQL**

### Why:
- Strong relational structure (perfect for properties + users + tenancy)
- Supports complex queries (audit logs, relationships)
- Scalable and production-ready

### ORM:
- **Prisma** (recommended)
- OR TypeORM (if using NestJS heavily)

---

## 6. Cache & Real-Time Features

**Redis**
- OTP storage
- Session caching
- Rate limiting
- Chat optimization

---

## 7. File Storage (Images & Videos)

### Recommended:
- **AWS S3** OR **Cloudinary**

### Usage:
- Property images
- Video walkthroughs
- Profile photos

---

## 8. Authentication & Security

- **JWT** (access + refresh tokens)
- **OTP-based** phone verification (SMS provider)
- **bcrypt** for password hashing
- **Role-based access control (RBAC)**

---

## 9. Messaging / Chat (Optional MVP)

### Option 1 (Simple MVP):
REST-based messaging (stored in DB)

### Option 2 (Advanced):
WebSockets (Socket.io)

---

## 10. Notifications

- **Firebase Cloud Messaging (FCM)** — Tenant app push notifications
- **Email notifications** — SendGrid or Resend

---

## 11. Hosting & Deployment

### Backend:
- Render / Railway (MVP)
- AWS (production scale)

### Web Apps:
- **Vercel** (recommended for React/Next.js)

### Mobile:
- **Expo EAS Build** (for React Native)

---

## 12. DevOps & Monitoring

- **Docker** (containerization)
- **GitHub Actions** (CI/CD)
- **Sentry** (error tracking)
- **Log monitoring** — Winston / Datadog later

---

## 13. System Architecture Summary

| Component | Technology |
|-----------|------------|
| Mobile App | React Native |
| Web Apps | React / Next.js |
| Backend | NestJS API |
| Database | PostgreSQL |
| Cache | Redis |
| Storage | S3 / Cloudinary |
| Notifications | FCM + Email |

---

## 14. Architecture Philosophy

- Modular backend (role-based modules)
- Stateless API design
- Mobile-first experience
- Scalable from MVP → SaaS platform
- Clean separation of concerns
