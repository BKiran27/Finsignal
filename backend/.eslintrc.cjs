// ESLint Configuration for Backend
module.exports = {
  root: true,
  env: {
    node: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/explicit-function-return-types': ['warn', { allowExpressions: true }],
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-console': 'off',
  },
};
