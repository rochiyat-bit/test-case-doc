import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config';
import { User } from './User';
import { TestStep } from './TestCase';

export interface TemplateAttributes {
  id: string;
  userId: string;
  name: string;
  module: string | null;
  scenario: string | null;
  testSteps: TestStep[];
  isPublic: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TemplateCreationAttributes extends Optional<TemplateAttributes, 'id' | 'module' | 'scenario' | 'isPublic'> {}

export class Template extends Model<TemplateAttributes, TemplateCreationAttributes> implements TemplateAttributes {
  declare id: string;
  declare userId: string;
  declare name: string;
  declare module: string | null;
  declare scenario: string | null;
  declare testSteps: TestStep[];
  declare isPublic: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Template.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    module: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    scenario: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    testSteps: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'templates',
    timestamps: true,
  }
);

// Define associations
Template.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Template, { foreignKey: 'userId', as: 'templates' });
