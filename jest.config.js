module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.{js,jsx}', '**/?(*.)+(spec|test).{js,jsx}'],
  moduleNameMapper: {
    '^@docusaurus/useDocusaurusContext$': '<rootDir>/__mocks__/@docusaurus/useDocusaurusContext.js',
    '^@docusaurus/Head$': '<rootDir>/__mocks__/@docusaurus/Head.js',
    '^@theme/Layout$': '<rootDir>/__mocks__/@theme/Layout.js',
    '^@site/(.*)$': '<rootDir>/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(js|jsx)$': ['babel-jest', {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        ['@babel/preset-react', { runtime: 'automatic' }],
      ],
    }],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.test.{js,jsx}',
    '!src/**/__tests__/**',
  ],
};
