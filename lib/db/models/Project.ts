import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config';
import { User } from './User';

export type InputType = 'prd' | 'text' | 'flow';
export type ProjectStatus = 'draft' | 'generated' | 'completed';

export interface ProjectAttributes {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  inputType: InputType;
  inputContent: string | null;
  originalFileName: string | null;
  status: ProjectStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProjectCreationAttributes extends Optional<ProjectAttributes, 'id' | 'description' | 'inputContent' | 'originalFileName' | 'status'> {}

export class Project extends Model<ProjectAttributes, ProjectCreationAttributes> implements ProjectAttributes {
  declare id: string;
  declare userId: string;
  declare name: string;
  declare description: string | null;
  declare inputType: InputType;
  declare inputContent: string | null;
  declare originalFileName: string | null;
  declare status: ProjectStatus;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Project.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    inputType: {
      type: DataTypes.ENUM('prd', 'text', 'flow'),
      allowNull: false,
    },
    inputContent: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    originalFileName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('draft', 'generated', 'completed'),
      defaultValue: 'draft',
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'projects',
    timestamps: true,
  }
);

// Define associations
Project.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Project, { foreignKey: 'userId', as: 'projects' });
