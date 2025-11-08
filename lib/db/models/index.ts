import { sequelize } from '../config';
import { User } from './User';
import { Project } from './Project';
import { TestCase } from './TestCase';
import { TestCaseVersion } from './TestCaseVersion';
import { Template } from './Template';

// Export all models
export { User, Project, TestCase, TestCaseVersion, Template };

// Initialize all models
export const initModels = () => {
  // Models are already initialized in their respective files
  // This function ensures they are loaded and associations are set up
  return {
    User,
    Project,
    TestCase,
    TestCaseVersion,
    Template,
    sequelize,
  };
};

// Export database instance
export { sequelize };
