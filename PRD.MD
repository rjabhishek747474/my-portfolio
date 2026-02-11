# Product Requirements Document (PRD): Personal Portfolio Website

## 1. Executive Summary
The Personal Portfolio Website is a dynamic, high-performance web application designed to showcase professional work, case studies, and skills. It features a secure Admin Dashboard for easy content management, allowing the owner to add, edit, delete, and reorder projects and case studies without touching the code.

## 2. Project Scope
- **Public Facing**: Responsive portfolio site with Home, About, Projects, Case Studies, and Contact sections.
- **Admin Facing**: Secure dashboard to manage all dynamic content (Projects, Case Studies, Profile info).
- **Tech Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Prisma, PostgreSQL (assumed), NextAuth.js.

## 3. User Roles
- **Viewer (Public)**: Can view all public pages, download resume, and contact the owner.
- **Admin (Owner)**: Can authenticate securely and manage all website content via the dashboard.

## 4. Key Features & Functional Requirements

### 4.1. Public Interface
- **Hero Section**: Engaging introduction with professional summary.
- **Projects Gallery**: Grid view of projects with filtering capabilities (by tech stack or category).
- **Case Studies**: Specialized detailed views for major projects, possibly with PDF download support.
- **About Me**: Detailed professional background.
- **Contact Form**: Functional form to send emails (likely via an API route sending to email service).
- **Resume Download**: Option to download the latest resume.

### 4.2. Admin Dashboard (`/admin`)
- **Authentication**: Secure login using `next-auth` (Credentials or OAuth).
- **Dashboard Overview**: Summary of projects and case studies.
- **Project Management**:
  - **Create/Edit/Delete Project**: Fields for Title, Description, Thumbnail, Technologies, Live Link, Repo Link, Date.
  - **Reorder Projects**: Drag-and-drop interface (`@dnd-kit`) to control display order.
  - **Image Uploads**: Integration with Cloudinary for handling media assets.
- **Case Study Management**:
  - Similar CRUD operations as Projects but with richer content structure.
  - PDF generation or uploading capabilities (`pdf2pic` suggests PDF handling).
- **Settings**: Update profile information, SEO metadata, and social links.

## 5. Technical Architecture

### 5.1. Tech Stack
- **Frontend**: Next.js 14, React, Tailwind CSS, Framer Motion (animations).
- **Backend**: Next.js API Routes (Server Actions potentially).
- **Database**: PostgreSQL with Prisma ORM.
- **Authentication**: NextAuth.v4 with Prisma Adapter.
- **File Storage**: Cloudinary (inferred from dependencies).
- **Validation**: Zod.
- **Utilities**: `clsx`, `tailwind-merge` for styling; `lucide-react` for icons.

### 5.2. Data Model (Inferred)
*To be validated against `schema.prisma`*

**Project**
- `id`: String (UUID)
- `title`: String
- `description`: String
- `imageUrl`: String
- `tags`: String[]
- `link`: String
- `githubUrl`: String
- `order`: Int
- `createdAt`: DateTime
- `updatedAt`: DateTime

**CaseStudy**
- `id`: String (UUID)
- `title`: String
- `overview`: String
- `content`: Json/String (Rich Text)
- `pdfUrl`: String (Optional)
- `images`: String[]
- `order`: Int

**User (Admin)**
- `id`: String
- `email`: String (Unique)
- `password`: String (Hashed)
- `role`: String (ADMIN)

## 6. Non-Functional Requirements
- **Performance**: High Lighthouse score (>90) for core web vitals.
- **SEO**: Fully optimized meta tags, OpenGraph support, and sitemap generation.
- **Responsiveness**: Mobile-first design ensuring perfect rendering on all devices.
- **Security**:
  - Protected Admin Routes.
  - Input validation using Zod.
  - Secure headers.

## 7. Future Enhancements
- **Blog Section**: Integration with a headless CMS or MDX-based blog.
- **Analytics Dashboard**: Custom analytics or integration with Vercel Analytics/Google Analytics.
- **Dark/Light Mode Toggle**: System preference detection and manual toggle.
