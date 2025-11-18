# AI-Powered QA Test Case Generator

A production-ready web application that automatically generates comprehensive QA test cases from PRD documents, flowcharts, and step-by-step process descriptions using AI (Claude API).

## 🚀 Current Implementation Status

### ✅ Completed Features

1. **Project Setup**
   - Next.js 14 with TypeScript
   - Tailwind CSS + Shadcn/ui components
   - ESLint and code formatting
   - Environment configuration

2. **Database Layer**
   - Sequelize ORM with PostgreSQL
   - Complete database models:
     - User (authentication)
     - Project (test case projects)
     - TestCase (individual test cases)
     - TestCaseVersion (version history)
     - Template (reusable templates)
   - Migration scripts

3. **Authentication System**
   - NextAuth.js v5 implementation
   - Credentials provider (email/password)
   - Password hashing with bcrypt
   - JWT session management
   - Protected routes with middleware
   - Login and registration pages

4. **UI Components (Shadcn/ui)**
   - Button, Input, Label
   - Card components
   - Toast notifications system
   - Form validation with React Hook Form + Zod

### 🚧 Remaining Features to Implement

#### Priority 1: Core Functionality

1. **Dashboard Layout**
   - Create main dashboard layout
   - Add navigation sidebar
   - User profile dropdown
   - Project overview cards

2. **Claude API Integration**
   - Create Claude client (`lib/ai/claude-client.ts`)
   - Implement test case generation prompts
   - Add streaming support for real-time updates

3. **PRD Document Processing**
   - File upload API endpoint
   - Mammoth.js integration for DOCX parsing
   - Text extraction and processing

4. **Test Case Generation**
   - API endpoints for generation
   - Real-time progress tracking
   - Save generated test cases to database

5. **Excel Export**
   - ExcelJS integration
   - Formatted export with styling
   - Multiple sheet support

6. **Project Management**
   - Project CRUD API endpoints
   - Project list and detail pages
   - Project wizard for creation

7. **Test Case Management**
   - Test case table with inline editing
   - Filtering and search
   - Pagination
   - Bulk operations

## 📁 Project Structure

```
test-case-generator/
├── app/
│   ├── (auth)/              # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/         # Protected dashboard pages
│   │   ├── projects/
│   │   ├── generate/
│   │   ├── templates/
│   │   └── analytics/
│   ├── api/                 # API routes
│   │   ├── auth/
│   │   ├── projects/
│   │   ├── testcases/
│   │   ├── generate/
│   │   └── export/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                  # Shadcn/ui components
│   ├── forms/               # Form components
│   ├── tables/              # Table components
│   └── layouts/             # Layout components
├── lib/
│   ├── db/
│   │   ├── models/          # Sequelize models
│   │   │   ├── User.ts
│   │   │   ├── Project.ts
│   │   │   ├── TestCase.ts
│   │   │   ├── TestCaseVersion.ts
│   │   │   └── Template.ts
│   │   ├── migrations/
│   │   └── config.ts
│   ├── auth/                # Authentication
│   │   ├── auth.ts
│   │   ├── auth.config.ts
│   │   └── password.ts
│   ├── ai/                  # AI integration
│   ├── utils/               # Utility functions
│   └── validations/         # Zod schemas
├── types/                   # TypeScript types
├── hooks/                   # Custom React hooks
├── public/
├── scripts/                 # Database scripts
│   └── migrate.js
├── .env.example
├── .env.local
└── package.json
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Anthropic Claude API key

### Installation

1. **Clone and install dependencies:**

```bash
npm install
```

2. **Configure environment variables:**

Copy `.env.example` to `.env.local` and update:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/testcase_generator
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
ANTHROPIC_API_KEY=sk-ant-xxxxx
```

3. **Create PostgreSQL database:**

```bash
# Via psql
createdb testcase_generator

# Or via PostgreSQL client
psql -U postgres
CREATE DATABASE testcase_generator;
```

4. **Setup database:**

```bash
# Option 1: Complete setup (migrations + seed data)
npm run db:setup

# Option 2: Migration only (no sample data)
npm run db:migrate

# Option 3: Seed sample data after migration
npm run db:seed
```

**Sample data includes:**
- 2 demo users (demo@testgen.com / Password123)
- 2 sample projects
- 5 test cases
- 3 templates

5. **Start development server:**

```bash
npm run dev
```

Visit `http://localhost:3000`

## 📊 Database Management

### Available Scripts

```bash
# Complete setup (migrate + seed)
npm run db:setup

# Migrate tables only
npm run db:migrate

# Seed sample data
npm run db:seed

# Reset database (⚠️ deletes all data)
npm run db:reset
```

For detailed database documentation, see [DATABASE.md](./DATABASE.md)

## 🗄️ Database Schema

### Users Table
- `id` (UUID, PK)
- `email` (STRING, unique)
- `password` (STRING, hashed)
- `name` (STRING)
- `emailVerified` (DATE)
- `image` (STRING)

### Projects Table
- `id` (UUID, PK)
- `userId` (UUID, FK)
- `name` (STRING)
- `description` (TEXT)
- `inputType` (ENUM: 'prd', 'text', 'flow')
- `inputContent` (TEXT)
- `originalFileName` (STRING)
- `status` (ENUM: 'draft', 'generated', 'completed')

### TestCases Table
- `id` (UUID, PK)
- `projectId` (UUID, FK)
- `testCaseId` (STRING, unique)
- `module` (STRING)
- `scenario` (TEXT)
- `title` (STRING)
- `preconditions` (TEXT)
- `testSteps` (JSON)
- `testData` (TEXT)
- `priority` (ENUM: 'High', 'Medium', 'Low')
- `testType` (STRING)
- `status` (ENUM: 'Not Executed', 'Pass', 'Fail', 'Blocked')
- `version` (INTEGER)

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/signin` - Sign in (handled by NextAuth)
- `POST /api/auth/signout` - Sign out
- `GET /api/auth/session` - Get current session

### Projects (To Implement)
- `GET /api/projects` - List all user projects
- `POST /api/projects` - Create new project
- `GET /api/projects/[id]` - Get project details
- `PATCH /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Test Case Generation (To Implement)
- `POST /api/generate/from-prd` - Generate from PRD upload
- `POST /api/generate/from-text` - Generate from text input
- `POST /api/generate/from-flow` - Generate from flow description

### Test Cases (To Implement)
- `GET /api/testcases?projectId=` - List test cases
- `POST /api/testcases` - Create test case
- `PATCH /api/testcases/[id]` - Update test case
- `DELETE /api/testcases/[id]` - Delete test case

### Export (To Implement)
- `GET /api/export/excel?projectId=` - Export to Excel
- `GET /api/export/csv?projectId=` - Export to CSV

## 🎯 Next Steps for Development

1. **Create Dashboard Layout** (`app/(dashboard)/layout.tsx`)
   - Sidebar navigation
   - Header with user menu
   - Breadcrumbs

2. **Implement Claude AI Client** (`lib/ai/claude-client.ts`)
   ```typescript
   import Anthropic from '@anthropic-ai/sdk';

   const client = new Anthropic({
     apiKey: process.env.ANTHROPIC_API_KEY,
   });

   export async function generateTestCases(prdContent: string) {
     // Implementation
   }
   ```

3. **Create Projects API**
   - CRUD operations
   - File upload handling
   - Association with user

4. **Build Test Case Generation Flow**
   - Parse PRD document
   - Send to Claude API
   - Process AI response
   - Save to database

5. **Implement Excel Export**
   - Use ExcelJS library
   - Format according to spec
   - Download functionality

6. **Create Test Case Table**
   - Use TanStack Table
   - Inline editing
   - Sorting and filtering

## 🔒 Security Features

- Password hashing with bcrypt (10 rounds)
- JWT-based session management
- Protected API routes
- Input validation with Zod
- SQL injection prevention (Sequelize ORM)
- XSS protection
- CSRF protection (NextAuth)

## 📚 Technologies Used

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **UI Components:** Shadcn/ui, Radix UI
- **Backend:** Next.js API Routes, Sequelize ORM
- **Database:** PostgreSQL
- **Authentication:** NextAuth.js v5
- **AI:** Anthropic Claude API
- **Forms:** React Hook Form, Zod
- **State:** Zustand (to be implemented)
- **Data Fetching:** TanStack Query (to be implemented)

## 🤝 Contributing

This is a private project. For issues or questions, please contact the development team.

## 📄 License

See LICENSE file for details.

---

**Note:** This project is actively under development. Check the task list above for current implementation status.
