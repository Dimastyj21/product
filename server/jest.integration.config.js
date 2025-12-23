module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/integration/**/*.spec.ts'],
  verbose: true,
  testTimeout: 30000, // 30 сек достаточно
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'], // Опционально
};
