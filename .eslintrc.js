/* eslint-disable */

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'standard-with-typescript', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: ['react', 'prettier', 'preferred-import'],
  rules: {
    semi: 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-misused-promises': 'warn',
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/promise-function-async': 0,
  },
  ignorePatterns: ['.eslintrc.js'],
};
