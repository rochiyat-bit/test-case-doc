import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config';
import { Project } from './Project';

export type Priority = 'High' | 'Medium' | 'Low';
export type TestStatus = 'Not Executed' | 'Pass' | 'Fail' | 'Blocked';

export interface TestStep {
  step: number;
  action: string;
  expected: string;
}

export interface TestCaseAttributes {
  id: string;
  projectId: string;
  testCaseId: string;
  module: string | null;
  scenario: string | null;
  title: string;
  preconditions: string | null;
  testSteps: TestStep[];
  testData: string | null;
  priority: Priority;
  testType: string;
  status: TestStatus;
  version: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TestCaseCreationAttributes extends Optional<TestCaseAttributes, 'id' | 'module' | 'scenario' | 'preconditions' | 'testData' | 'status' | 'version'> {}

export class TestCase extends Model<TestCaseAttributes, TestCaseCreationAttributes> implements TestCaseAttributes {
  declare id: string;
  declare projectId: string;
  declare testCaseId: string;
  declare module: string | null;
  declare scenario: string | null;
  declare title: string;
  declare preconditions: string | null;
  declare testSteps: TestStep[];
  declare testData: string | null;
  declare priority: Priority;
  declare testType: string;
  declare status: TestStatus;
  declare version: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

TestCase.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    projectId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'projects',
        key: 'id',
      },
    },
    testCaseId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    module: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    scenario: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preconditions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    testSteps: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    testData: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    priority: {
      type: DataTypes.ENUM('High', 'Medium', 'Low'),
      allowNull: false,
      defaultValue: 'Medium',
    },
    testType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Functional',
    },
    status: {
      type: DataTypes.ENUM('Not Executed', 'Pass', 'Fail', 'Blocked'),
      allowNull: false,
      defaultValue: 'Not Executed',
    },
    version: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    tableName: 'test_cases',
    timestamps: true,
  }
);

// Define associations
TestCase.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });
Project.hasMany(TestCase, { foreignKey: 'projectId', as: 'testCases' });
