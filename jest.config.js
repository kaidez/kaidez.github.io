module.exports = {
  testEnvironment: 'jsdom',
  testMatch: [
    '**/tests/**/*.test.js',
    '**/__tests__/**/*.js'
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  collectCoverageFrom: [
    'src/assets/js/**/*.js',
    '!src/assets/js/**/*.min.js'
  ],
  setupFilesAfterEnv: [],
  verbose: true
};
