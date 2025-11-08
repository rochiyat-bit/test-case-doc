const { sequelize } = require('../lib/db/config');
const { initModels } = require('../lib/db/models');

async function migrate() {
  try {
    console.log('🔄 Starting database migration...');

    // Initialize all models
    initModels();

    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection established.');

    // Sync all models (create tables if they don't exist)
    // Use { alter: true } to update existing tables without losing data
    // Use { force: true } to drop and recreate tables (WARNING: data loss!)
    await sequelize.sync({ alter: true });

    console.log('✅ Database migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrate();
