# 🚀 Quick Start Guide

Panduan cepat untuk setup dan mulai development AI QA Test Case Generator.

## ⚡ Fast Setup (5 menit)

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env.local
# Edit .env.local - ganti dengan database credentials Anda

# 3. Buat database
createdb testcase_generator

# 4. Setup database lengkap (migrate + seed)
npm run db:setup

# 5. Start development
npm run dev
```

Buka browser: http://localhost:3000

## 🔐 Login ke Aplikasi

Setelah seeding, gunakan credentials ini:

```
Email: demo@testgen.com
Password: Password123
```

atau

```
Email: admin@testgen.com
Password: Password123
```

## 📝 Database Commands Cheat Sheet

```bash
# Setup lengkap (first time)
npm run db:setup

# Migrate tabel saja
npm run db:migrate

# Isi data sample
npm run db:seed

# Reset database (hapus semua)
npm run db:reset

# Reset + seed ulang
npm run db:reset && npm run db:seed
```

## 🎯 Common Tasks

### Setup Project Baru

```bash
git clone <repository-url>
cd test-case-doc
npm install
cp .env.example .env.local
# Edit .env.local
npm run db:setup
npm run dev
```

### Update Database Schema

Setelah edit models di `lib/db/models/`:

```bash
npm run db:migrate
```

### Fresh Start dengan Data Baru

```bash
npm run db:reset
npm run db:seed
npm run dev
```

### Cek Database

```bash
# Via psql
psql testcase_generator

# List tables
\dt

# View data
SELECT * FROM users;
SELECT * FROM projects;
SELECT * FROM test_cases;
```

## 🔧 Environment Variables

Edit `.env.local`:

```env
# Database (REQUIRED)
DATABASE_URL=postgresql://user:password@localhost:5432/testcase_generator

# NextAuth (REQUIRED)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-string-here

# Claude AI (REQUIRED untuk generation)
ANTHROPIC_API_KEY=sk-ant-your-key-here

# App Config
NODE_ENV=development
MAX_FILE_SIZE=10485760
```

## 📊 Sample Data yang Tersedia

Setelah `npm run db:seed`:

### Users
- **demo@testgen.com** - Demo user
- **admin@testgen.com** - Admin user
- Password untuk semua: `Password123`

### Projects
- **E-Commerce Platform - User Authentication**
- **Mobile Banking App - Fund Transfer**

### Test Cases (5 total)
- TC-AUTH-001: Login valid credentials
- TC-AUTH-002: Login invalid password
- TC-AUTH-003: User registration
- TC-AUTH-004: Password reset
- TC-AUTH-005: Email validation

### Templates (3 total)
- Login Test Template
- API Integration Test Template
- Form Validation Template

## ⚠️ Troubleshooting

### Error: "Cannot connect to database"

```bash
# Cek PostgreSQL berjalan
sudo service postgresql status

# Start PostgreSQL
sudo service postgresql start
```

### Error: "Database does not exist"

```bash
# Buat database
createdb testcase_generator
```

### Error: "Authentication failed"

- Cek username/password di `DATABASE_URL`
- Test connection: `psql -U postgres -d testcase_generator`

### Error: "Port 3000 already in use"

```bash
# Matikan process di port 3000
lsof -ti:3000 | xargs kill -9

# Atau gunakan port lain
PORT=3001 npm run dev
```

## 🎓 Next Steps

1. ✅ Login dengan demo account
2. ✅ Explore sample projects & test cases
3. ✅ Baca dokumentasi lengkap di [README.md](./README.md)
4. ✅ Pelajari database schema di [DATABASE.md](./DATABASE.md)
5. ✅ Mulai development feature baru!

## 📚 Dokumentasi Lengkap

- [README.md](./README.md) - Overview & architecture
- [DATABASE.md](./DATABASE.md) - Database management guide
- [.env.example](./.env.example) - Environment variables reference

## 🆘 Butuh Bantuan?

1. Cek error message di terminal
2. Lihat troubleshooting di atas
3. Baca [DATABASE.md](./DATABASE.md) untuk detail
4. Check PostgreSQL logs

---

**Happy Coding! 🚀**
