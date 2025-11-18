const { sequelize } = require('../lib/db/config');
const { initModels } = require('../lib/db/models');
const { execSync } = require('child_process');

async function setup() {
  try {
    console.log('🚀 Starting database setup...\n');

    // Initialize all models
    initModels();

    // Test connection
    console.log('1️⃣ Testing database connection...');
    await sequelize.authenticate();
    console.log('✅ Database connection established.\n');

    // Run migrations
    console.log('2️⃣ Running migrations...');
    await sequelize.sync({ alter: true });
    console.log('✅ Migrations completed.\n');

    // Run seeding
    console.log('3️⃣ Running seeding...');
    execSync('node scripts/seed.js', { stdio: 'inherit' });

  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
}

setup();
