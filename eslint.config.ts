// eslint.config.ts
import js from '@eslint/js';
import eslint from '@eslint/js';
import json from '@eslint/json';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config([
  eslint.configs.recommended,
  tseslint.configs.recommended,
  js.configs.recommended,
  json.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx,mts,cts}'],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
]);
