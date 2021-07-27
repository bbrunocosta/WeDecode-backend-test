export default {
  roots: ['<rootDir>/src'],
  collectCoverage: true,
  coverageReporters: ['json', 'html'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/**/*.js',
    '!<rootDir>/src/domain/**/*',
    '!<rootDir>/**/*.protocol.ts',
    '!<rootDir>/src/main/server.ts',
    '!<rootDir>/src/main/adapters/*.ts',
    '!<rootDir>/src/main/config/env.ts'
  ],
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  coverageProvider: 'v8',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}