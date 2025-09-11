# KangTech Admin

A modern admin dashboard built with Next.js, shadcn/ui, PostgreSQL, and NextAuth.js.

## Features

- 🔐 **Authentication**: Secure login with NextAuth.js
- 👤 **Admin Initialization**: First-time setup for admin user
- 📊 **Modern Dashboard**: Beautiful UI with shadcn/ui components
- 🛡️ **Protected Routes**: Middleware-based route protection
- 🎨 **Zinc Theme**: Clean, modern design system

## Prerequisites

- Node.js 18+
- Bun package manager
- PostgreSQL database

## Setup Instructions

### 1. Install Dependencies

```bash
bun install
```

### 2. Database Setup

1. Create a PostgreSQL database
2. Update the `DATABASE_URL` in `.env` file:

   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/kangtech_web?schema=public"
   ```

3. Generate Prisma client:

   ```bash
   bunx prisma generate
   ```

4. Run database migrations:
   ```bash
   bunx prisma migrate dev
   ```

### 3. Environment Variables

Update `.env` file with your configuration:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/kangtech_web?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# App
NODE_ENV="development"
```

### 4. Start Development Server

```bash
bun dev
```

## Usage

1. **First Visit**: Navigate to `http://localhost:3000`

   - If no admin exists, you'll be redirected to admin initialization
   - Create your first admin account

2. **Login**: Use your admin credentials to access the dashboard

3. **Dashboard**: Access the modern admin interface with:
   - User statistics
   - System status
   - Recent activities
   - Quick actions

## API Endpoints

- `GET /api/admin/check` - Check if admin user exists
- `POST /api/admin/init` - Initialize admin user (first-time setup)

## Project Structure

```
src/
├── app/
│   ├── admin-init/          # Admin initialization page
│   ├── dashboard/           # Admin dashboard
│   ├── login/              # Login page
│   ├── api/
│   │   ├── auth/           # NextAuth API routes
│   │   ├── admin/          # Admin API routes
│   │   │   ├── init/       # Admin creation
│   │   │   └── check/      # Admin existence check
│   └── providers.tsx       # Session provider
├── components/ui/          # shadcn/ui components
├── lib/
│   ├── auth.ts            # NextAuth configuration
│   └── db.ts              # Prisma client
└── middleware.ts           # Route protection
```

## Database Schema

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  ADMIN
  USER
}
```

## Technologies Used

- **Next.js 14** - React framework
- **shadcn/ui** - UI component library
- **Tailwind CSS** - Styling
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **NextAuth.js** - Authentication
- **TypeScript** - Type safety
- **Bun** - Package manager

## Security Features

- Password hashing with bcryptjs
- JWT-based sessions
- Route protection middleware
- Admin-only dashboard access
- Secure API endpoints

## Customization

The dashboard uses the Zinc color scheme from shadcn/ui. You can customize:

- Colors in `src/app/globals.css`
- Components in `src/components/ui/`
- Dashboard layout in `src/app/dashboard/page.tsx`
- Authentication flow in `src/lib/auth.ts`

## Product Description

kangtech.com is website for seller computer please our motto make website like

- apple.com
- samsung.com
- https://www.logitech.com/id-id

with WHITE THEME
