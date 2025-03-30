// import js from '@eslint/js'
// import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'
// import tseslint from 'typescript-eslint'

// export default tseslint.config(
//   { ignores: ['dist'] },
//   {
//     extends: [js.configs.recommended, ...tseslint.configs.recommended],
//     files: ['**/*.{ts,tsx}'],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//     },
//     plugins: {
//       'react-hooks': reactHooks,
//       'react-refresh': reactRefresh,
//     },
//     rules: {
//       ...reactHooks.configs.recommended.rules,
//       'react-refresh/only-export-components': [
//         'warn',
//         { allowConstantExport: true },
//       ],
//     },
//   },
// )

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist', 'node_modules'], // ✅ Ignoring dist and node_modules
  },
  js.configs.recommended, // ✅ Basic JavaScript ESLint recommended rules
  ...tseslint.configs.recommended, // ✅ TypeScript recommended rules
  {
    files: ['**/*.{ts,tsx,js,jsx}'], // ✅ Match TS, TSX, JS, and JSX files
    languageOptions: {
      ecmaVersion: 'latest', // ✅ Latest ECMAScript version
      globals: globals.browser, // ✅ Include browser globals
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules, // ✅ Add react-hooks recommended rules
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }, // ✅ Allow constant export for React Refresh
      ],
    },
  },
);

