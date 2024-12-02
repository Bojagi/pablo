import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import importPlugin from 'eslint-plugin-import';
import hooksPlugin from 'eslint-plugin-react-hooks';

export default [
  importPlugin.flatConfigs.recommended,
  ...tseslint.config(...tseslint.configs.recommended),
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    // env: {
    //   node: true,
    //   jest: true,
    // },
    files: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.js', 'src/**/*.jsx'],
    
    plugins: {
      'react-hooks': hooksPlugin,
    },
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"]
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "<root>/tsconfig.json",
        },
      }
    },
    // plugins: ['@typescript-eslint', '@typescript-eslint/tslint', 'react-hooks', 'react', 'prettier'],
    rules: {
      'prettier/prettier': 'error',
      'global-require': 'off',
      'no-undef': 'off',
      // 'import/no-dynamic-require': 'off',
      // 'import/no-named-as-default': 'off',
      // 'import/no-extraneous-dependencies': [
      //   'error',
      //   { devDependencies: ['**/*.spec.ts', '**/*.spec.tsx'] },
      // ],
      // 'import/no-named-as-default-member': 'off',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'functional/prefer-immutable-types': 'off',
      // '@typescript-eslint/no-use-before-define': ['error', 'nofunc'],
      // 'import/prefer-default-export': 'off',
      // 'import/extensions': 'off',
      // 'import/no-unresolved': 'off',
      'no-unused-vars': 'off',
      'react-hooks/rules-of-hooks': 'error',
      "react-hooks/exhaustive-deps": ["warn", {
        "additionalHooks": "(useEventListener)"
      }],
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
];
