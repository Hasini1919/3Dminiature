<div align="center">

<img src="https://img.shields.io/badge/Status-Completed-success?style=for-the-badge" />
<img src="https://img.shields.io/badge/Type-Full--Stack%20E--Commerce-blueviolet?style=for-the-badge" />
<img src="https://img.shields.io/badge/Language-TypeScript%20%7C%20JavaScript-F7DF1E?style=for-the-badge&logo=typescript" />
<img src="https://img.shields.io/badge/Frontend-Next.js%2014-000000?style=for-the-badge&logo=next.js" />
<img src="https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?style=for-the-badge&logo=node.js" />
<img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb" />
<img src="https://img.shields.io/badge/Payments-Stripe-635BFF?style=for-the-badge&logo=stripe" />
<img src="https://img.shields.io/badge/Cloud-Cloudinary-3448C5?style=for-the-badge" />

<br /><br />

# 🎁 Tiny Treasures

### *Every miniature tells a story. Make it yours.*

**A production-grade, full-stack 3D Miniature E-Commerce Platform with real-time customization, Stripe payments, multi-provider social auth, and a complete Admin CRM**

*Role-Based Auth · Social Login · Dynamic Pricing · Stripe Checkout · Cloudinary CDN · Cron Automation*

---

[🏗 Architecture](#-system-architecture) · [✨ Features](#-features) · [🛠 Tech Stack](#-tech-stack) · [🔐 Security](#-security-model) · [🚀 Getting Started](#-getting-started) · [📸 Screenshots](#-screenshots)

</div>

---

> **📌 Portfolio Note:** Tiny Treasures is a **real client project** — a 2nd-year software development engagement for an actual business specialising in customized 3D miniature artworks. Every feature listed was built for and delivered to a real customer. The codebase demonstrates full-stack product engineering: a live customization engine with dynamic pricing, a secure Stripe payment flow, multi-provider social authentication via Passport.js, automated background cron jobs, and a complete admin CRM — all wired together in a production-ready, layered architecture.

---

## 💡 About the Project

Managing a niche e-commerce store for handcrafted 3D miniatures comes with requirements that off-the-shelf platforms cannot solve cleanly:

- 🎨 **Real-time product customization** — customers configure colors, messages, themes, and add-ons with pricing that recalculates dynamically as they build
- 💳 **Secure end-to-end payments** — Stripe handles all card data; the application server never touches raw payment credentials
- 🖼️ **Cloudinary CDN** for all product imagery — no local file storage, no upload-related server bottleneck
- 📊 **Full Admin CRM** — order lifecycle management, review moderation, coupon engine, and advertisement scheduling
- 🤖 **Automated background jobs** — coupons and advertisements auto-expire via cron without requiring admin action
- 🌐 **Multi-provider social auth** — Google, Facebook, and Instagram OAuth via a unified Passport.js strategy layer

This project was architected and delivered as a real-world client engagement — not a tutorial clone. Every decision reflects a genuine product requirement.

---

## 🏗️ System Architecture

Tiny Treasures follows a clean **4-tier architecture**: a dual-zone Next.js 14 frontend (Customer Storefront + Admin Dashboard), a centralized Express.js API gateway with role-based middleware, a MongoDB data layer with Mongoose ODM, and a suite of external service integrations.

<br />

![Tiny Treasures System Architecture](./FrontEnd/public/assets/tinytreasures-architecture.svg)

<br />

### Architecture Overview

Two distinct actors enter through separate frontend zones, each scoped to their role:

| Actor | Entry Point | Scope |
|---|---|---|
| 🛒 Customer | Public Storefront | Browse, customize, purchase, review, manage profile |
| 👑 Admin | Admin Dashboard | Products, orders, CRM, coupons, advertisements, refunds |

All API communication flows through a single Express.js gateway. Auth middleware verifies the JWT on every protected request, extracts the role (`admin` / `customer`), and attaches it to the request context — a customer-scoped JWT structurally cannot reach any admin route.

---

## ✨ Features

### 🛒 Customer Features

**Shopping & Discovery**
- Browse the full 3D miniature catalog with gallery views and zoom previews
- Product recommendations and related item suggestions
- Homepage advertisement banners and promotional sections

**Live Customization Engine**
- Configure miniature frames across four dimensions: Colors, Text/Messages, Themes, and Add-ons
- Pricing updates **dynamically in real time** as the customer builds their configuration
- Final price is **re-verified server-side** at order creation — client total is never trusted

**Checkout & Payments**
- Cart management (add, remove, update quantity)
- Server-side coupon code validation and redemption
- Secure payment via **Stripe** — card data never touches the application server
- Delivery address selection from saved addresses
- Order confirmation email via Nodemailer

**Account & Engagement**
- Register / Login (email + password) or Social Login (Google, Facebook, Instagram)
- Wishlist management
- Star-rating product reviews with aggregated averages
- Order history and real-time status tracking
- Newsletter subscription

---

### 👑 Admin Features

**Product & Catalog Management**
- Full CRUD on products with Cloudinary image upload
- Manage customization options and per-option pricing rules
- Homepage advertisement and banner management with scheduled auto-expiry

**Order Lifecycle Management**
- Status progression: `Pending → Processing → Shipped → Delivered`
- Detailed per-order view with customer info and line items
- Refund and cancellation processing

**CRM & Customer Management**
- Customer list with block/unblock controls
- Review moderation: approve, hide, or remove customer submissions
- Coupon engine: create codes, set discount values, validity windows, and per-code usage limits

**Dashboard & Notifications**
- KPI overview: order stats and revenue summary
- Admin notification system for key platform events
- PDF invoice generation per order

---

## 🏗️ Tier Breakdown

**① Frontend Tier — Next.js 14 (App Router)**
Two isolated zone groups. The Customer Storefront handles the full shopping journey — product discovery, customization, cart, checkout, and profile management. The Admin Dashboard covers the full operational surface — product CRUD, order management, CRM, coupons, advertisements, and refunds. Both zones share a global Axios instance with JWT interceptors, Zustand/Context API for state (cart, wishlist, auth), and React Hook Form for all form handling.

**② API Gateway Tier — Node.js + Express.js**
A single Express.js server receives all API requests. Auth middleware verifies the JWT and attaches the decoded role before any route handler executes. Route groups: `/auth`, `/products`, `/cart`, `/checkout`, `/verify-payment`, `/orders`, `/reviews`, `/coupons`, `/wishlist`, `/profile`, `/upload`, `/refunds`, `/advertisements`, `/notifications`, `/subscribe`, `/feedback`. Passport.js strategies (Google, Facebook, Instagram) feed into the `/auth` flow and issue a JWT on successful OAuth callback.

**③ Data Tier — MongoDB + Mongoose**
MongoDB stores all application data across 13 Mongoose models: `User`, `Product`, `Order`, `Cart`, `Review`, `Coupon`, `Address`, `Wishlist`, `Advertisement`, `Feedback`, `Subscription`, `Refund`, `Counter`. Mongoose ODM provides schema validation, typed queries, and relationship population.

**④ External Services Tier**
Stripe processes all payment data — the server creates a session and verifies the webhook callback; it never handles raw card numbers. Cloudinary receives product images and returns a CDN URL stored in MongoDB. Nodemailer dispatches transactional emails. `node-cron` runs scheduled jobs to auto-expire coupons and advertisements.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| Next.js 14 (App Router) | SSR + CSR hybrid, file-based routing |
| TypeScript | End-to-end type safety |
| Tailwind CSS | Utility-first responsive styling |
| Zustand + Context API | Global state — cart, wishlist, auth |
| React Hook Form | Performant, uncontrolled form handling |
| Axios + JWT Interceptors | API client, token injection, 401 handling |
| Framer Motion | Page and component animations |
| Swiper.js | Product image carousels and sliders |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express.js | REST API server |
| MongoDB + Mongoose | Document database + typed ODM |
| JWT + Bcrypt | Stateless auth + secure password hashing |
| Passport.js | OAuth strategies — Google, Facebook, Instagram |
| Stripe | Payment processing + webhook verification |
| Cloudinary | Image hosting + CDN delivery |
| Nodemailer | Transactional email — orders, resets, newsletters |
| node-cron | Scheduled background jobs |
| Multer | Multipart file upload middleware |

### Infrastructure
| Service | Purpose |
|---|---|
| Vercel | Frontend deployment |
| Render / Railway | Backend deployment |
| MongoDB Atlas | Managed cloud database |
| Cloudinary CDN | Global media delivery |

---

## 🔐 Security Model

| Threat | Attack Vector | Mitigation |
|---|---|---|
| Unauthorized route access | Customer JWT used on admin route | Role extracted from verified JWT; admin middleware blocks non-admin roles structurally |
| Client-side price manipulation | Tampered cart total sent at checkout | Price re-queried from DB server-side at order creation; client value ignored entirely |
| Coupon abuse | Client-side coupon validation | All coupon codes validated and decremented server-side only |
| Plain-text password storage | DB breach exposes credentials | bcrypt with salt rounds on all passwords — no plain-text ever stored |
| Raw card data exposure | Payment form posting to app server | Stripe handles all card data; server only creates session and verifies signed webhook |
| Unauthenticated API access | Direct API calls without JWT | Auth middleware on all protected routes; 401 on missing or invalid token |
| Malicious file uploads | Oversized or dangerous file types | Multer enforces type and size limits before Cloudinary upload |
| Stale coupons and ads | Expired entries remain active in DB | node-cron jobs auto-expire coupons and advertisements on schedule |
| Forged social login tokens | Fake OAuth callback payload | Passport.js verifies all OAuth tokens directly with the provider before issuing JWT |

---

## 🧠 Engineering Decisions

**Why dynamic pricing on the client instead of pre-calculated prices?** The customization option space is combinatorial — colors × themes × add-ons × text messages. Pre-computing every combination in the database is impractical. Instead, base prices and per-option modifiers are fetched once, and the client computes the live running total as the user configures. Critically, this total is always re-verified server-side at order creation, so the UI is responsive while the data layer remains the source of truth.

**Why Cloudinary instead of local storage or S3?** Cloudinary provides automatic image transformation, responsive resizing, and global CDN delivery without additional infrastructure. For a product gallery with zoom previews and multi-image carousels, CDN-optimised images are a UX requirement. Local storage also introduces statefulness on a cloud-hosted backend — Cloudinary eliminates that concern entirely.

**Why Passport.js for three OAuth providers?** Each provider (Google, Facebook, Instagram) has a different callback flow, token format, and user profile schema. Passport.js provides a unified strategy interface — all three go through the same `passport.authenticate()` middleware and produce the same JWT on success, keeping the auth controller clean and provider-agnostic.

**Why cron jobs for expiry instead of checking on read?** Checking coupon and advertisement validity on every request adds latency and scatters conditional logic across controllers. Background expiry via `node-cron` means the database always reflects true state — no read-time filtering needed and no stale data surfaced to users even on cache hits.

**Why MongoDB over PostgreSQL for this domain?** Product customization options are highly variable per product — different products have entirely different option schemas. MongoDB's flexible document model accommodates this without requiring a complex Entity-Attribute-Value relational pattern. For this specific domain, schema flexibility outweighs relational guarantees.

---

## 📊 Project Status
```
BACKEND                                              FRONTEND
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅  MongoDB schema (13 Mongoose models)               ✅  Home page (banners, listings, ads)
✅  Auth API (register, login, JWT)                   ✅  Product gallery + zoom previews
✅  Social Auth (Google, Facebook, Instagram)         ✅  Live customization engine (dynamic pricing)
✅  Products API (CRUD, search, filter)               ✅  Shopping cart
✅  Cart & Wishlist API                               ✅  Stripe checkout flow
✅  Checkout + Stripe integration                     ✅  User auth (email + social login)
✅  Stripe webhook verification                       ✅  Admin dashboard KPIs
✅  Order management API                              ✅  Admin product management
✅  Review system API                                 ✅  Admin order lifecycle management
✅  Coupon engine API                                 ✅  Admin CRM (customers, reviews, coupons)
✅  Cloudinary image upload pipeline                  ✅  Advertisement management
✅  Nodemailer transactional email                    ✅  Profile + address management
✅  Admin CRM APIs (aggregation)                      ✅  Order history + review history
✅  node-cron auto-expiry jobs                        ✅  Refund management screen
✅  Refund & cancellation API                         ✅  Fully responsive UI (mobile + desktop)
✅  PDF invoice generation
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or MongoDB Atlas)
- Stripe account + API keys
- Cloudinary account + credentials
- Google / Facebook / Instagram OAuth app credentials

### 1. Clone the Repository
```bash
git clone https://github.com/tishanth-t007/tiny-treasures.git
cd tiny-treasures
```

### 2. Backend Setup
```bash
cd BackEnd
npm install
cp .env.example .env
```

Configure `.env`:
```env
MONGODB_URI="mongodb+srv://user:password@cluster.mongodb.net/tinytreasures"
JWT_SECRET="your-jwt-secret"
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
FACEBOOK_APP_ID="..."
FACEBOOK_APP_SECRET="..."
INSTAGRAM_CLIENT_ID="..."
INSTAGRAM_CLIENT_SECRET="..."
EMAIL_HOST="smtp.gmail.com"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
PORT=5000
```
```bash
npm run dev
# API running at http://localhost:5000
```

### 3. Frontend Setup
```bash
cd FrontEnd/next
npm install
cp .env.example .env.local
```

Configure `.env.local`:
```env
NEXT_PUBLIC_API_URL="http://localhost:5000"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
```
```bash
npm run dev
# App running at http://localhost:3000
```

---

## 📁 Project Structure
```
tiny-treasures/
│
├── BackEnd/
│   └── src/
│       ├── config/               # DB connection, Passport OAuth strategies
│       ├── controllers/
│       │   ├── admin_controller/ # Product, order, coupon, ad, CRM controllers
│       │   ├── user-controller   # Customer-facing business logic
│       │   └── wishlistController
│       ├── middleware/           # JWT auth guard, role guard, Multer upload
│       ├── models/               # 13 Mongoose schemas
│       ├── routes/
│       │   ├── admin_routes/     # Admin-only route definitions
│       │   └── ...               # Customer-facing route definitions
│       ├── service/              # Business logic (product, profile)
│       ├── cron/                 # Scheduled jobs (coupon/ad expiry, notifications)
│       ├── emailService.js       # Nodemailer dispatch
│       ├── mailer.js             # Email templates
│       └── index.js              # Express app entry point
│
└── FrontEnd/next/
    ├── app/
    │   ├── (Admin)/              # Admin Dashboard pages
    │   ├── authentication/       # Login, register, reset password
    │   ├── cart/                 # Cart page + order summary
    │   ├── checkout/             # Stripe checkout flow
    │   ├── profile/              # Customer account, settings, wishlist
    │   └── page.tsx              # Home page
    ├── components/               # Reusable UI components
    ├── context/                  # App context + Wishlist context
    ├── utils/                    # Auth utils, format helpers, API wrappers
    └── services/                 # API service functions
```

---

## 📸 Screenshots

### Home Page
![Home](FrontEnd/public/screenshots/home1.png)
![Home](FrontEnd/public/screenshots/home2.png)

### Product & Customization
![Advertisement](FrontEnd/public/screenshots/products1.png)
![Product Details](FrontEnd/public/screenshots/products2.png)
![Customization](FrontEnd/public/screenshots/products3.png)
![Customization](FrontEnd/public/screenshots/products4.png)

### Auth & Cart
![Login](FrontEnd/public/screenshots/login.png)
![Cart](FrontEnd/public/screenshots/cart1.png)
![Cart](FrontEnd/public/screenshots/cart2.png)

### Reviews, Profile & Pages
![Review](FrontEnd/public/screenshots/review1.png)
![Profile](FrontEnd/public/screenshots/profile.jpeg)
![About](FrontEnd/public/screenshots/about.png)
![Contact](FrontEnd/public/screenshots/contact.png)
![Feedback](FrontEnd/public/screenshots/feedback.png)
![Terms](FrontEnd/public/screenshots/terms.png)

### Admin Dashboard
![Admin](FrontEnd/public/screenshots/admin1.jpeg)
![Admin](FrontEnd/public/screenshots/admin2.jpeg)
![Admin](FrontEnd/public/screenshots/admin3.jpeg)

---

## 🗺️ Roadmap

- [x] Full product catalog with live customization engine
- [x] Stripe payment integration and webhook verification
- [x] Role-based JWT auth with multi-provider social login
- [x] Admin CRM — orders, customers, reviews, coupons, ads
- [x] Cloudinary CDN image management
- [x] Automated background jobs via node-cron
- [x] PDF invoice generation
- [ ] Real-time order status updates (WebSocket / SSE)
- [ ] Abandoned cart recovery emails
- [ ] Product recommendation engine (purchase-history based)
- [ ] Mobile app (React Native)

---

## 📬 Contact

<div align="center">

**Tishanth Sivakumar** — Software Engineering Student · Colombo, Sri Lanka 🇱🇰

*Available for Software Engineering internships — open to remote and on-site opportunities*

[![Email](https://img.shields.io/badge/Email-tishanthsivakumar007%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:tishanthsivakumar007@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-tishanth--t007-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tishanth-t007/)

</div>

---

<div align="center">

*Built with ❤️ for a real client · Colombo, Sri Lanka 🇱🇰*

*Full-Stack · TypeScript · Next.js · Node.js · MongoDB · Stripe · Cloudinary · Passport.js*

</div>