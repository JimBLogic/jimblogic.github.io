import js from '@eslint/js';
import prettier from 'eslint-config-prettier';

export default [
  { ignores: ['dist/**', 'node_modules/**', 'playwright-report/**', 'test-results/**', 'audit-artifacts/**', 'coverage/**', '*.json'] },
  js.configs.recommended,
  prettier,
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        window: 'readonly', document: 'readonly', fetch: 'readonly', console: 'readonly', localStorage: 'readonly', sessionStorage: 'readonly', setTimeout: 'readonly', clearTimeout: 'readonly', URL: 'readonly', URLSearchParams: 'readonly', navigator: 'readonly', IntersectionObserver: 'readonly', FormData: 'readonly', Event: 'readonly', Node: 'readonly', HTMLElement: 'readonly', process: 'readonly', Buffer: 'readonly', __dirname: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^(_|lang$)', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^(e|err|_)' }],
      'no-empty': ['error', { allowEmptyCatch: true }]
    }
  }
];
