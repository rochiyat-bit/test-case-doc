import { Sequelize } from 'sequelize';

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/testcase_generator';

let sequelizeInstance: Sequelize | null = null;

export const sequelize = (() => {
  if (!sequelizeInstance) {
    sequelizeInstance = new Sequelize(DATABASE_URL, {
      dialect: 'postgres',
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      define: {
        timestamps: true,
        underscored: false,
      },
    });
  }
  return sequelizeInstance;
})();

export async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    return false;
  }
}

export async function syncDatabase(force = false) {
  try {
    await sequelize.sync({ force });
    console.log('✅ Database synced successfully.');
    return true;
  } catch (error) {
    console.error('❌ Error syncing database:', error);
    return false;
  }
}
