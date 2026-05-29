# Sydney Bloomer — Floral Atelier Platform

A luxury florist e-commerce and wholesale management platform for Sydney's premier floral studio.

## Tech Stack

| Layer       | Technology                                     |
|-------------|------------------------------------------------|
| Frontend    | Next.js 14 (App Router), TypeScript            |
| Styling     | Tailwind CSS, Framer Motion                    |
| Auth        | NextAuth.js (Credentials + Google OAuth)       |
| ORM         | Prisma                                         |
| Database    | PostgreSQL                                     |
| State       | Zustand (cart)                                 |
| Forms       | React Hook Form + Zod                          |

## Project Structure

```
sydney-bloomer/
├── app/
│   ├── page.tsx              # Homepage
│   ├── shop/                 # Product catalog + detail
│   ├── seasonal/             # Seasonal flower showcase
│   ├── events/               # Event inquiry + portfolio
│   ├── about/                # Studio story
│   ├── auth/                 # Login + Register
│   ├── admin/                # Admin dashboard
│   └── api/                  # REST API routes
├── components/
│   ├── layout/               # Navbar, Footer, Providers
│   ├── home/                 # Homepage sections
│   ├── ui/                   # FlowerCard, CartSidebar, etc.
│   └── admin/                # AdminShell sidebar
├── lib/
│   ├── prisma.ts             # Prisma client singleton
│   └── auth.ts               # NextAuth config
├── store/
│   └── cartStore.ts          # Zustand cart state
└── prisma/
    ├── schema.prisma         # Full database schema
    └── seed.ts               # Realistic seeder data
```

## Quick Start

### 1. Install dependencies

```bash
cd sydney-bloomer
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env with your database URL and secrets
```

### 3. Set up PostgreSQL

```bash
# macOS with Homebrew
brew install postgresql@16
brew services start postgresql@16
createdb sydney_bloomer
```

Or use [Neon](https://neon.tech) / [Supabase](https://supabase.com) for a hosted PostgreSQL.

### 4. Run migrations & seed

```bash
npm run db:generate   # Generate Prisma client
npm run db:migrate    # Run migrations
npm run db:seed       # Seed with flower data
```

### 5. Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Admin login:** `admin@sydneybloomer.com.au` / `admin123!`
**Admin panel:** [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Database Tables

| Table              | Purpose                               |
|--------------------|---------------------------------------|
| `users`            | Customers, admins, wholesale accounts |
| `accounts`         | OAuth provider accounts               |
| `flowers`          | Product catalogue                     |
| `flower_categories`| Roses, Orchids, Natives, etc.         |
| `flower_inventory` | Stock quantities & restock tracking   |
| `imported_flowers` | Import source, supplier, arrival info |
| `orders`           | Customer orders                       |
| `order_items`      | Line items per order                  |
| `deliveries`       | Delivery tracking                     |
| `cart_items`       | Persistent cart                       |
| `wishlist_items`   | Saved flowers                         |
| `event_inquiries`  | Wedding & event quote requests        |
| `subscriptions`    | Weekly/fortnightly corporate subs     |
| `gallery`          | Portfolio & event photos              |
| `blogs`            | Journal / CMS posts                   |
| `testimonials`     | Client reviews                        |
| `admin_logs`       | Audit trail for admin actions         |
| `promotions`       | Discount codes                        |

---

## API Routes

| Method | Endpoint                 | Description              | Auth      |
|--------|--------------------------|--------------------------|-----------|
| GET    | `/api/flowers`           | List flowers (filterable)| Public    |
| POST   | `/api/flowers`           | Create flower            | Admin     |
| GET    | `/api/flowers/[slug]`    | Single flower            | Public    |
| PATCH  | `/api/flowers/[slug]`    | Update flower            | Admin     |
| DELETE | `/api/flowers/[slug]`    | Delete flower            | Admin     |
| GET    | `/api/orders`            | List orders              | Auth      |
| POST   | `/api/orders`            | Place order              | Public    |
| POST   | `/api/inquiries`         | Submit event inquiry     | Public    |
| GET    | `/api/inquiries`         | List inquiries           | Admin     |
| POST   | `/api/auth/register`     | Register user            | Public    |
| POST   | `/api/subscribe`         | Newsletter subscribe     | Public    |

---

## User Roles

| Role        | Access                                          |
|-------------|-------------------------------------------------|
| `CUSTOMER`  | Browse, cart, checkout, order history           |
| `WHOLESALE` | Bulk pricing, wholesale portal, bulk orders     |
| `ADMIN`     | Full admin dashboard, all CRUD operations       |

---

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel --prod
```

Set these environment variables in Vercel dashboard:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` (your production URL)
- `GOOGLE_CLIENT_ID` (optional)
- `GOOGLE_CLIENT_SECRET` (optional)

### Environment Variables Required

```
DATABASE_URL          PostgreSQL connection string
NEXTAUTH_SECRET       Random 32+ char string (openssl rand -base64 32)
NEXTAUTH_URL          Your site URL
```

---

## Features Overview

- **Seasonal Intelligence** — Flowers automatically displayed by current Australian season
- **Wholesale Portal** — Separate pricing and bulk ordering for business accounts
- **Event Floristry** — Inquiry system with admin quote management
- **Admin Dashboard** — Full CMS for flowers, orders, inquiries, gallery, blog
- **Cart & Checkout** — Persistent cart with delivery calculation
- **Corporate Subscriptions** — Recurring weekly/fortnightly delivery management
- **Import Tracking** — Imported flower supplier and arrival schedule management
- **SEO Optimised** — Next.js metadata API, sitemap-ready structure

---

*Sydney Bloomer — Elevating Sydney's floral landscape through curated botanical design.*
