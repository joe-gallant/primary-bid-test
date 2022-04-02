/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '^components$': '<rootDir>/src/components',
    '^utils$': '<rootDir>/src/utils',
    '^store$': '<rootDir>/src/store',
    '^pages$': '<rootDir>/src/pages',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
};
