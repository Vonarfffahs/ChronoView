import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Ігноруємо dist папку глобально
  {
    ignores: [
      '**/dist/**',
      '**/cypress/**',
      '**/test/**',
      '**/*.config.{ts,js}',
    ],
  },

  // Конфігурація для JavaScript та TypeScript файлів
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off', // Вимикає заборону на require
      '@typescript-eslint/no-explicit-any': 'off', // Вимикає заборону на any
    },
  },

  // Додаємо рекомендовані конфігурації для ESLint та TypeScript
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
