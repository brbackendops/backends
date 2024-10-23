export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  transformIgnorePatterns: ['/node_modules/'],
};
