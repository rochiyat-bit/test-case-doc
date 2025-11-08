import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config';
import { TestCase } from './TestCase';
import { User } from './User';

export interface TestCaseVersionAttributes {
  id: string;
  testCaseId: string;
  version: number;
  changes: Record<string, any>;
  changedBy: string;
  createdAt?: Date;
}

export interface TestCaseVersionCreationAttributes extends Optional<TestCaseVersionAttributes, 'id'> {}

export class TestCaseVersion extends Model<TestCaseVersionAttributes, TestCaseVersionCreationAttributes> implements TestCaseVersionAttributes {
  declare id: string;
  declare testCaseId: string;
  declare version: number;
  declare changes: Record<string, any>;
  declare changedBy: string;
  declare readonly createdAt: Date;
}

TestCaseVersion.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    testCaseId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'test_cases',
        key: 'id',
      },
    },
    version: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    changes: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    changedBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'test_case_versions',
    timestamps: true,
    updatedAt: false,
  }
);

// Define associations
TestCaseVersion.belongsTo(TestCase, { foreignKey: 'testCaseId', as: 'testCase' });
TestCaseVersion.belongsTo(User, { foreignKey: 'changedBy', as: 'user' });
TestCase.hasMany(TestCaseVersion, { foreignKey: 'testCaseId', as: 'versions' });
