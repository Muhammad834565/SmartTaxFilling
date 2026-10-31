# Smartax Books Web App (Next.js + NestJS + PostgreSQL)

A full-stack, enterprise-grade replica of the **Smartax Books** WordPress site, architected as a modern decoupled web application.

---

## 🏗 Architecture & Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | **Next.js 14 (App Router)** | Modern React UI with Tailwind CSS, TypeScript, and Lucide icons. |
| **Backend** | **NestJS 10** | TypeScript REST API with Dependency Injection, Validation Pipes, and CORS. |
| **Database** | **PostgreSQL 16** | Relational schema managed via TypeORM with automatic bootstrap seeding. |
| **Orchestration** | **Docker Compose** | Single-command container deployment for Postgres, Backend, and Frontend. |

---

## 📁 Project Structure

```
h:/project/smart/web app/
├── docker-compose.yml          # PostgreSQL (5432) + NestJS (4000) + Next.js (3000)
├── README.md
├── backend/                    # NestJS API
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   ├── main.ts             # Application entry point with CORS & Validation
│   │   ├── app.module.ts       # TypeORM PostgreSQL connection configuration
│   │   ├── entities/           # PostgreSQL Entities:
│   │   │   ├── page.entity.ts
│   │   │   ├── service.entity.ts
│   │   │   ├── post.entity.ts
│   │   │   ├── pricing-plan.entity.ts
│   │   │   ├── testimonial.entity.ts
│   │   │   ├── faq.entity.ts
│   │   │   ├── inquiry.entity.ts
│   │   │   └── site-setting.entity.ts
│   │   ├── api/                # REST Controllers, DTOs & Services
│   │   └── seed/               # Automatic database seeder for WordPress data
└── frontend/                   # Next.js App Router
    ├── Dockerfile
    ├── package.json
    ├── tailwind.config.ts
    ├── public/
    │   └── uploads/            # Exact replicated media, logos & banners from WordPress
    └── src/
        ├── app/
        │   ├── page.tsx                    # Replicated Homepage
        │   ├── about-us/page.tsx           # Company story, credentials, core pillars
        │   ├── services/page.tsx           # All 12 US & UK services catalog
        │   ├── services/[slug]/page.tsx    # Individual service deep-dive pages
        │   ├── pricing/page.tsx            # Plans & one-off formation service rates
        │   ├── blog/page.tsx               # Blog articles directory
        │   ├── blog/[slug]/page.tsx        # Blog reading view
        │   ├── contact/page.tsx            # Office location & inquiry submission
        │   ├── terms-and-conditions/page.tsx
        │   └── privacy-policy/page.tsx
        ├── components/
        │   ├── Navbar.tsx                  # Top bar, US & UK dropdowns, mobile menu
        │   ├── Footer.tsx                  # Credentials, direct links, contact info
        │   ├── ContactForm.tsx             # Live API submission to NestJS / Postgres
        │   ├── PricingCalculator.tsx       # Monthly / Annual toggle & cards
        │   └── FaqAccordion.tsx            # Interactive FAQ accordion
        └── lib/
            ├── api.ts                      # Backend API client with offline fallback
            └── data.ts                     # Full replicated dataset
```

---

## 🚀 Running the Web App

### Option A: Running with Docker (Recommended)

1. Open PowerShell in the `web app` directory:
   ```powershell
   cd "h:\project\smart\web app"
   ```
2. Start all services:
   ```powershell
   docker compose up -d
   ```
3. Access the services:
   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Backend API**: [http://localhost:4000/api](http://localhost:4000/api)
   - **PostgreSQL**: `localhost:5432` (`smartax_db`, user: `postgres`, password: `postgrespassword`)

---

### Option B: Running Locally (Development Mode)

#### 1. Start PostgreSQL
You can start just the database container:
```powershell
cd "h:\project\smart\web app"
docker compose up -d postgres
```

#### 2. Run NestJS Backend
```powershell
cd "h:\project\smart\web app\backend"
npm.cmd install
npm.cmd run start:dev
```
The NestJS backend will automatically create all PostgreSQL tables and seed all WordPress content upon startup.

#### 3. Run Next.js Frontend
```powershell
cd "h:\project\smart\web app\frontend"
npm.cmd install
npm.cmd run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📡 Backend API Endpoints

- `GET /api/services` – List all services (supports `?category=USA` or `?category=UK`)
- `GET /api/services/:slug` – Get specific service details
- `GET /api/pages` – List all published pages
- `GET /api/pages/:slug` – Get specific page content
- `GET /api/posts` – List all published blog articles
- `GET /api/posts/:slug` – Get specific blog article
- `GET /api/pricing` – Get pricing packages
- `GET /api/testimonials` – Get verified client reviews
- `GET /api/faqs` – Get frequently asked questions
- `GET /api/settings` – Get site metadata and contact details
- `POST /api/inquiries` – Submit contact form / consultation inquiry (saved to PostgreSQL)
- `GET /api/inquiries` – View submitted client inquiries

---

## 🎯 Replicated WordPress Services

1. **Bookkeeping & Accounting Services** (`/services/bookkeeping-accounting-services`)
2. **US Tax Compliance & Filing Services** (`/services/us-tax-compliance-filing-services`)
3. **Payroll Tax Management** (`/services/payroll-tax-management`)
4. **US Sales & Use Tax Compliance** (`/services/us-sales-use-tax-compliance`)
5. **Startup Business Formation – USA** (`/services/startup-business-formation-usa`)
6. **E-Commerce Accounting & Tax Services** (`/services/e-commerce-accounting-tax-services-us`)
7. **Real Estate Financial & Tax Services** (`/services/real-estate-financial-tax-services-us`)
8. **Logistics & Transport Accounting** (`/services/logistics-transport-accounting-tax-support`)
9. **Virtual Bank Accounts & Payment Solutions** (`/services/virtual-bank-accounts-payment-solutions`)
10. **UK Company Formation & Compliance** (`/services/uk-company-formation-compliance-services`)
11. **UK Tax Compliance & Filing Services** (`/services/uk-tax-compliance-filing-services`)
12. **UK VAT Registration & Compliance** (`/services/uk-vat-registration-compliance`)
