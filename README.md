# SawaRI Landing Page

> The website for SawaRI, a ride-hailing and parcel-delivery platform for India: product landing page, rider waitlist, driver registration and admin dashboard.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Build-646CFF?logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?logo=tailwindcss&logoColor=white)

## Overview

SawaRI is a ride-hailing and parcel-delivery service designed for reliable, safe transport across India. This repository contains its public website and operations tooling. The site has been updated from a "Coming Soon" design to a launched product, with direct app-store download links (see [`LAUNCH_UPDATE_GUIDE.md`](LAUNCH_UPDATE_GUIDE.md)).

## Features

- Marketing landing page: hero, features, how it works, testimonials, download and "ready to ride" sections
- App download page
- Rider **waitlist** form and **driver registration** with address and vehicle details (Indian pincode lookup)
- Admin login and dashboards for drivers and waitlist, behind protected routes
- Careers, About, Contact, Privacy Policy and Terms of Service pages
- Multi-language toggle for Indian languages
- Maintenance page, error boundary and optimised image loading

## Tech stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Framer Motion |
| Routing and data | React Router, TanStack Query, React Hook Form, Zod |
| Backend services | Supabase (`supabase/`), small Express API (`api/`) with Nodemailer |
| Email | EmailJS (client) and Nodemailer (API) |

## Project structure

```
src/
├── components/     Landing sections, waitlist, driver-registration, admin layout
├── pages/          Index, Waitlist, DriverRegistration, Admin*, Careers, Legal ...
└── ...
api/                Express API for email (server.js)
supabase/           Supabase configuration
public/             Static assets
```

## Getting started

### Prerequisites

- Node.js 18 or later

### Run the website

```bash
git clone https://github.com/Knitesh026/sawari-landing-page.git
cd sawari-landing-page
npm install
npm run dev
```

### Run the email API

```bash
cd api
npm install
npm run dev
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build the site (and install API dependencies) |
| `npm run build:dev` | Development-mode build |

## Configuration

| Variable | Used by | Purpose |
|----------|---------|---------|
| `VITE_API_URL` | Website | Base URL of the email API |
| `EMAIL_USER`, `EMAIL_PASSWORD` | `api/` | SMTP credentials for outgoing email |
| `PORT`, `NODE_ENV` | `api/` | Server settings |

> Never commit `.env` files or real credentials.

## Security notes

- A `.env` file is currently tracked in this repository. Remove it from version control (`git rm --cached .env`), add it to `.gitignore`, and rotate any credential it contained.

## Legal

Privacy Policy and Terms of Service pages are included in the site.

## Credits

Developed by PageCraft Tech in India.

## License

All rights reserved.
