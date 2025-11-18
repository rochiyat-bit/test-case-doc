const { sequelize } = require('../lib/db/config');
const { initModels } = require('../lib/db/models');

async function reset() {
  try {
    console.log('🔄 Starting database reset...');
    console.log('⚠️  WARNING: This will DELETE ALL DATA in the database!');

    // Initialize all models
    initModels();

    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection established.');

    // Drop all tables and recreate them
    console.log('🗑️  Dropping all tables...');
    await sequelize.sync({ force: true });

    console.log('✅ Database reset completed successfully!');
    console.log('💡 Run "npm run db:seed" to populate with sample data.');

    process.exit(0);
  } catch (error) {
    console.error('❌ Reset failed:', error);
    process.exit(1);
  }
}

reset();
