const bcrypt = require('bcryptjs');
const { sequelize } = require('../lib/db/config');
const { User, Project, TestCase, Template } = require('../lib/db/models');

async function seed() {
  try {
    console.log('🌱 Starting database seeding...');

    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection established.');

    // Create demo users
    console.log('\n📝 Creating demo users...');
    const hashedPassword = await bcrypt.hash('Password123', 10);

    const demoUser = await User.findOrCreate({
      where: { email: 'demo@testgen.com' },
      defaults: {
        email: 'demo@testgen.com',
        password: hashedPassword,
        name: 'Demo User',
        emailVerified: new Date(),
      },
    });

    const adminUser = await User.findOrCreate({
      where: { email: 'admin@testgen.com' },
      defaults: {
        email: 'admin@testgen.com',
        password: hashedPassword,
        name: 'Admin User',
        emailVerified: new Date(),
      },
    });

    console.log('✅ Created users:');
    console.log('   - demo@testgen.com (password: Password123)');
    console.log('   - admin@testgen.com (password: Password123)');

    const userId = demoUser[0].id;

    // Create sample projects
    console.log('\n📁 Creating sample projects...');

    const project1 = await Project.findOrCreate({
      where: {
        userId,
        name: 'E-Commerce Platform - User Authentication'
      },
      defaults: {
        userId,
        name: 'E-Commerce Platform - User Authentication',
        description: 'Test cases for user login, registration, and password reset functionality',
        inputType: 'text',
        inputContent: 'User authentication module with login, registration, forgot password, and social login features.',
        status: 'generated',
      },
    });

    const project2 = await Project.findOrCreate({
      where: {
        userId,
        name: 'Mobile Banking App - Fund Transfer'
      },
      defaults: {
        userId,
        name: 'Mobile Banking App - Fund Transfer',
        description: 'Test cases for money transfer between accounts',
        inputType: 'text',
        inputContent: 'Fund transfer feature allowing users to transfer money between their own accounts and to other users.',
        status: 'draft',
      },
    });

    console.log('✅ Created sample projects');

    const projectId = project1[0].id;

    // Create sample test cases
    console.log('\n🧪 Creating sample test cases...');

    await TestCase.findOrCreate({
      where: { testCaseId: 'TC-AUTH-001' },
      defaults: {
        projectId,
        testCaseId: 'TC-AUTH-001',
        module: 'Authentication',
        scenario: 'User Login with Valid Credentials',
        title: 'Verify successful login with valid email and password',
        preconditions: 'User account exists in the system with verified email',
        testSteps: [
          {
            step: 1,
            action: 'Navigate to login page',
            expected: 'Login form is displayed with email and password fields',
          },
          {
            step: 2,
            action: 'Enter valid email address',
            expected: 'Email is accepted and field shows no error',
          },
          {
            step: 3,
            action: 'Enter valid password',
            expected: 'Password is masked and field shows no error',
          },
          {
            step: 4,
            action: 'Click on Login button',
            expected: 'User is redirected to dashboard with welcome message',
          },
        ],
        testData: 'Email: demo@testgen.com, Password: Password123',
        priority: 'High',
        testType: 'Functional',
        status: 'Not Executed',
        version: 1,
      },
    });

    await TestCase.findOrCreate({
      where: { testCaseId: 'TC-AUTH-002' },
      defaults: {
        projectId,
        testCaseId: 'TC-AUTH-002',
        module: 'Authentication',
        scenario: 'User Login with Invalid Password',
        title: 'Verify error message when login with incorrect password',
        preconditions: 'User account exists in the system',
        testSteps: [
          {
            step: 1,
            action: 'Navigate to login page',
            expected: 'Login form is displayed',
          },
          {
            step: 2,
            action: 'Enter valid email address',
            expected: 'Email is accepted',
          },
          {
            step: 3,
            action: 'Enter incorrect password',
            expected: 'Password field accepts input',
          },
          {
            step: 4,
            action: 'Click on Login button',
            expected: 'Error message displayed: "Invalid email or password"',
          },
        ],
        testData: 'Email: demo@testgen.com, Password: WrongPassword123',
        priority: 'High',
        testType: 'Negative',
        status: 'Not Executed',
        version: 1,
      },
    });

    await TestCase.findOrCreate({
      where: { testCaseId: 'TC-AUTH-003' },
      defaults: {
        projectId,
        testCaseId: 'TC-AUTH-003',
        module: 'Authentication',
        scenario: 'User Registration with Valid Data',
        title: 'Verify successful user registration with all required fields',
        preconditions: 'User email does not exist in the system',
        testSteps: [
          {
            step: 1,
            action: 'Navigate to registration page',
            expected: 'Registration form is displayed with all required fields',
          },
          {
            step: 2,
            action: 'Enter valid full name',
            expected: 'Name field accepts input without error',
          },
          {
            step: 3,
            action: 'Enter valid email address',
            expected: 'Email field accepts input and validates format',
          },
          {
            step: 4,
            action: 'Enter strong password meeting requirements',
            expected: 'Password strength indicator shows "Strong"',
          },
          {
            step: 5,
            action: 'Confirm password with matching value',
            expected: 'Confirm password field shows no error',
          },
          {
            step: 6,
            action: 'Click on Create Account button',
            expected: 'Account created successfully, verification email sent',
          },
        ],
        testData: 'Name: John Doe, Email: john.doe@example.com, Password: SecurePass123!',
        priority: 'High',
        testType: 'Functional',
        status: 'Not Executed',
        version: 1,
      },
    });

    await TestCase.findOrCreate({
      where: { testCaseId: 'TC-AUTH-004' },
      defaults: {
        projectId,
        testCaseId: 'TC-AUTH-004',
        module: 'Authentication',
        scenario: 'Password Reset Flow',
        title: 'Verify complete password reset process',
        preconditions: 'User account exists with verified email',
        testSteps: [
          {
            step: 1,
            action: 'Click on "Forgot Password" link',
            expected: 'Redirected to password reset page',
          },
          {
            step: 2,
            action: 'Enter registered email address',
            expected: 'Email field validates format',
          },
          {
            step: 3,
            action: 'Click on "Send Reset Link" button',
            expected: 'Success message displayed, reset email sent',
          },
          {
            step: 4,
            action: 'Open reset link from email',
            expected: 'Redirected to password reset form',
          },
          {
            step: 5,
            action: 'Enter new password',
            expected: 'Password meets strength requirements',
          },
          {
            step: 6,
            action: 'Confirm new password and submit',
            expected: 'Password updated successfully, redirected to login',
          },
        ],
        testData: 'Email: demo@testgen.com, New Password: NewSecure123!',
        priority: 'Medium',
        testType: 'Functional',
        status: 'Not Executed',
        version: 1,
      },
    });

    await TestCase.findOrCreate({
      where: { testCaseId: 'TC-AUTH-005' },
      defaults: {
        projectId,
        testCaseId: 'TC-AUTH-005',
        module: 'Authentication',
        scenario: 'Email Format Validation',
        title: 'Verify email validation for invalid formats',
        preconditions: 'Registration or login page is accessible',
        testSteps: [
          {
            step: 1,
            action: 'Navigate to registration page',
            expected: 'Registration form is displayed',
          },
          {
            step: 2,
            action: 'Enter email without @ symbol (e.g., "testexample.com")',
            expected: 'Error message: "Invalid email format"',
          },
          {
            step: 3,
            action: 'Enter email without domain (e.g., "test@")',
            expected: 'Error message: "Invalid email format"',
          },
          {
            step: 4,
            action: 'Enter email with spaces (e.g., "test @example.com")',
            expected: 'Error message: "Invalid email format"',
          },
        ],
        testData: 'Invalid emails: testexample.com, test@, test @example.com',
        priority: 'Medium',
        testType: 'Validation',
        status: 'Not Executed',
        version: 1,
      },
    });

    console.log('✅ Created 5 sample test cases');

    // Create sample templates
    console.log('\n📋 Creating sample templates...');

    await Template.findOrCreate({
      where: {
        userId,
        name: 'Login Test Template'
      },
      defaults: {
        userId,
        name: 'Login Test Template',
        module: 'Authentication',
        scenario: 'User Login Verification',
        testSteps: [
          {
            step: 1,
            action: 'Navigate to login page',
            expected: 'Login form is displayed',
          },
          {
            step: 2,
            action: 'Enter credentials',
            expected: 'Credentials are accepted',
          },
          {
            step: 3,
            action: 'Click login button',
            expected: 'User is authenticated and redirected',
          },
        ],
        isPublic: true,
      },
    });

    await Template.findOrCreate({
      where: {
        userId,
        name: 'API Integration Test Template'
      },
      defaults: {
        userId,
        name: 'API Integration Test Template',
        module: 'API',
        scenario: 'API Endpoint Testing',
        testSteps: [
          {
            step: 1,
            action: 'Send API request with valid parameters',
            expected: 'API returns 200 status code',
          },
          {
            step: 2,
            action: 'Validate response structure',
            expected: 'Response matches expected schema',
          },
          {
            step: 3,
            action: 'Verify response data accuracy',
            expected: 'Data values are correct and complete',
          },
        ],
        isPublic: true,
      },
    });

    await Template.findOrCreate({
      where: {
        userId,
        name: 'Form Validation Template'
      },
      defaults: {
        userId,
        name: 'Form Validation Template',
        module: 'UI/Forms',
        scenario: 'Input Field Validation',
        testSteps: [
          {
            step: 1,
            action: 'Leave required field empty and submit',
            expected: 'Error message displayed for required field',
          },
          {
            step: 2,
            action: 'Enter invalid format data',
            expected: 'Format validation error displayed',
          },
          {
            step: 3,
            action: 'Enter data exceeding max length',
            expected: 'Length validation error displayed',
          },
          {
            step: 4,
            action: 'Enter valid data and submit',
            expected: 'Form submitted successfully',
          },
        ],
        isPublic: false,
      },
    });

    console.log('✅ Created 3 sample templates');

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log('   - 2 demo users');
    console.log('   - 2 sample projects');
    console.log('   - 5 test cases');
    console.log('   - 3 templates');
    console.log('\n🔐 Login credentials:');
    console.log('   Email: demo@testgen.com');
    console.log('   Password: Password123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
