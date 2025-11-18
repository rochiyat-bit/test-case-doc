# Database Management Guide

Panduan lengkap untuk mengelola database pada AI QA Test Case Generator.

## 📋 Prerequisites

Pastikan Anda sudah:
- ✅ Install PostgreSQL (versi 12+)
- ✅ Database sudah dibuat
- ✅ Konfigurasi `DATABASE_URL` di `.env.local`

## 🔧 Setup Database

### Konfigurasi Connection String

Edit file `.env.local`:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/testcase_generator
```

Ganti:
- `username` - username PostgreSQL Anda
- `password` - password PostgreSQL Anda
- `localhost` - host database (localhost untuk development)
- `5432` - port PostgreSQL (default: 5432)
- `testcase_generator` - nama database

### Buat Database

Jika belum membuat database, jalankan di PostgreSQL:

```sql
CREATE DATABASE testcase_generator;
```

## 🚀 Database Scripts

### 1. Setup Lengkap (Migrate + Seed)

Untuk setup pertama kali atau setup development:

```bash
npm run db:setup
```

Script ini akan:
- ✅ Test koneksi database
- ✅ Membuat semua tabel (migrations)
- ✅ Mengisi data awal (seeding)

**Output yang diharapkan:**
```
🚀 Starting database setup...

1️⃣ Testing database connection...
✅ Database connection established.

2️⃣ Running migrations...
✅ Migrations completed.

3️⃣ Running seeding...
🌱 Starting database seeding...
✅ Database seeding completed successfully!
```

### 2. Migrate Only (Tanpa Seeding)

Untuk membuat/update struktur tabel tanpa data:

```bash
npm run db:migrate
```

Script ini akan:
- ✅ Membuat tabel baru jika belum ada
- ✅ Update struktur tabel yang sudah ada (ALTER)
- ⚠️ **TIDAK** menghapus data yang sudah ada

**Kapan menggunakan:**
- Setup database pertama kali
- Setelah update model/schema
- Deployment ke production

### 3. Seed Only (Data Awal)

Untuk mengisi database dengan data sample:

```bash
npm run db:seed
```

Script ini akan membuat:
- 👤 **2 Demo Users**
  - `demo@testgen.com` (Password: Password123)
  - `admin@testgen.com` (Password: Password123)

- 📁 **2 Sample Projects**
  - E-Commerce Platform - User Authentication
  - Mobile Banking App - Fund Transfer

- 🧪 **5 Test Cases**
  - TC-AUTH-001: Login dengan kredensial valid
  - TC-AUTH-002: Login dengan password salah
  - TC-AUTH-003: User registration
  - TC-AUTH-004: Password reset flow
  - TC-AUTH-005: Email validation

- 📋 **3 Templates**
  - Login Test Template
  - API Integration Test Template
  - Form Validation Template

**Kapan menggunakan:**
- Development/Testing
- Setelah db:reset
- Butuh data sample untuk testing

### 4. Reset Database (⚠️ DANGER)

Untuk menghapus SEMUA data dan tabel, lalu membuat ulang:

```bash
npm run db:reset
```

**PERINGATAN:**
- 🔴 Menghapus SEMUA tabel
- 🔴 Menghapus SEMUA data
- 🔴 TIDAK BISA di-undo
- 🔴 Jangan gunakan di production!

**Kapan menggunakan:**
- Development environment saja
- Saat ingin mulai dari awal
- Setelah perubahan schema yang significant

**Best practice:**
```bash
# Reset + setup ulang dengan data sample
npm run db:reset && npm run db:seed
```

## 📊 Database Schema

### Users Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  email_verified TIMESTAMP,
  image VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Projects Table

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  input_type ENUM('prd', 'text', 'flow') NOT NULL,
  input_content TEXT,
  original_file_name VARCHAR(255),
  status ENUM('draft', 'generated', 'completed') DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Test Cases Table

```sql
CREATE TABLE test_cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id),
  test_case_id VARCHAR(255) UNIQUE NOT NULL,
  module VARCHAR(255),
  scenario TEXT,
  title VARCHAR(255) NOT NULL,
  preconditions TEXT,
  test_steps JSON NOT NULL,
  test_data TEXT,
  priority ENUM('High', 'Medium', 'Low') DEFAULT 'Medium',
  test_type VARCHAR(255) DEFAULT 'Functional',
  status ENUM('Not Executed', 'Pass', 'Fail', 'Blocked') DEFAULT 'Not Executed',
  version INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Test Case Versions Table

```sql
CREATE TABLE test_case_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  test_case_id UUID NOT NULL REFERENCES test_cases(id),
  version INTEGER NOT NULL,
  changes JSON NOT NULL,
  changed_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Templates Table

```sql
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  module VARCHAR(255),
  scenario TEXT,
  test_steps JSON NOT NULL,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🔍 Verifikasi Database

### Cek Koneksi

```bash
# Via Node.js
node -e "require('./lib/db/config').testConnection()"
```

### Cek Tables via psql

```bash
psql -U username -d testcase_generator

# List semua tabel
\dt

# Describe struktur tabel
\d users
\d projects
\d test_cases
\d test_case_versions
\d templates

# Query data
SELECT * FROM users;
SELECT * FROM projects;
```

### Cek via pgAdmin

1. Buka pgAdmin
2. Connect ke server PostgreSQL
3. Expand Databases → testcase_generator → Schemas → public → Tables

## 🐛 Troubleshooting

### Error: "Connection refused"

**Problem:** PostgreSQL service tidak jalan

**Solution:**
```bash
# Linux/Mac
sudo service postgresql start

# Windows
# Start PostgreSQL dari Services
```

### Error: "database does not exist"

**Problem:** Database belum dibuat

**Solution:**
```bash
createdb testcase_generator
# atau via psql
psql -U postgres
CREATE DATABASE testcase_generator;
```

### Error: "authentication failed"

**Problem:** Username/password salah di connection string

**Solution:**
- Cek credentials di `.env.local`
- Verifikasi dengan: `psql -U username -d testcase_generator`

### Error: "Please install pg package manually"

**Problem:** Package `pg` tidak terinstall

**Solution:**
```bash
npm install pg pg-hstore
```

### Error: "Cannot find module 'bcryptjs'"

**Problem:** Dependencies belum terinstall

**Solution:**
```bash
npm install
```

## 🔐 Security Best Practices

1. **Jangan commit `.env.local`**
   - Sudah ada di `.gitignore`
   - Berisi credentials sensitif

2. **Gunakan strong password untuk database**
   - Minimal 12 karakter
   - Kombinasi huruf, angka, simbol

3. **Production database**
   - Gunakan connection pooling
   - Enable SSL: `?ssl=true`
   - Gunakan separate user untuk aplikasi

4. **Backup database regular**
   ```bash
   pg_dump testcase_generator > backup_$(date +%Y%m%d).sql
   ```

5. **Restore dari backup**
   ```bash
   psql testcase_generator < backup_20231108.sql
   ```

## 📈 Development Workflow

### Typical Flow

```bash
# 1. Clone repository
git clone <repo-url>
cd test-case-doc

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env.local
# Edit .env.local dengan database credentials

# 4. Setup database
npm run db:setup

# 5. Start development
npm run dev
```

### Setelah Update Model

```bash
# Jika ada perubahan pada model di lib/db/models/
npm run db:migrate
```

### Testing dengan Fresh Data

```bash
# Reset dan seed ulang
npm run db:reset
npm run db:seed
```

## 🚀 Production Setup

```bash
# 1. Set production DATABASE_URL
export DATABASE_URL=postgresql://user:pass@prod-host:5432/dbname

# 2. Run migration only (JANGAN reset atau seed!)
npm run db:migrate

# 3. Verify
node -e "require('./lib/db/config').testConnection()"
```

## 📞 Support

Jika mengalami masalah:
1. Cek error message di console
2. Verifikasi connection string
3. Cek PostgreSQL service status
4. Lihat log di terminal

---

**Note:** Selalu backup database sebelum menjalankan operasi yang mengubah struktur atau data!
