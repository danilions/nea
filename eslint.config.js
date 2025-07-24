// Minimal ESLint v9 flat config for React + TypeScript
import js from '@eslint/js';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [

  js.configs.recommended,
  reactRecommended,
  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    ignores: ['node_modules', 'dist', '.next'],
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
];
