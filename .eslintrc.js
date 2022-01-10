module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
    'jest/globals': true,
  },
  globals: {
    context: true,
    document: 'readonly',
    EventSource: 'readonly',
    expect: true,
    FormData: 'readonly',
    google: true,
    jsdom: true,
    JSX: true,
    mount: true,
    mountWithRouter: true,
    React: true,
    shallow: true,
    shallowWithRouter: true,
    window: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    files: ['*.tsx'],
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['tsconfig.json', 'packages/*/tsconfig.json'],
      },
    },
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      fragment: 'Fragment',
      version: 'detect',
    },
    propWrapperFunctions: [
      'forbidExtraProps',
      { property: 'freeze', object: 'Object' },
      { property: 'myFavoriteWrapper' },
      { property: 'forbidExtraProps', exact: true },
    ],
    componentWrapperFunctions: [
      'observer',
      { property: 'styled' },
      { property: 'observer', object: 'Mobx' },
      { property: 'observer', object: '<pragma>' },
    ],
    formComponents: ['CustomForm', { name: 'Form', formAttribute: 'endpoint' }],
    linkComponents: ['Hyperlink', { name: 'Link', linkAttribute: 'to' }],
    jest: {
      version: 27,
    },
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:jsx-a11y/recommended',
    'plugin:markdown/recommended',
    'plugin:prettier/recommended',
    'plugin:promise/recommended',
    'plugin:react/all',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'react-app',
    'react-app/jest',
  ],
  plugins: [
    'import',
    'import-helpers',
    'jsx-a11y',
    'prettier',
    'promise',
    'react',
    'react-hooks',
    '@typescript-eslint',
    'jest',
  ],
  rules: {
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-extraneous-class': 0,
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': [2, { varsIgnorePattern: 'React' }],
    'comma-dangle': 0,
    '@typescript-eslint/comma-dangle': 0,
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': 2,

    curly: 2,
    'import/order': 0,
    'import/prefer-default-export': 0,
    'import-helpers/order-imports': [
      2,
      {
        newlinesBetween: 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
          ignoreCase: true,
        },
        groups: ['/^react/', 'module', ['parent', 'sibling', 'index']],
      },
    ],
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'no-alert': 2,
    'no-console': [
      2,
      {
        allow: ['warn', 'error'],
      },
    ],
    'no-debugger': 2,
    'no-inline-comments': 2,
    'no-param-reassign': 2,
    'no-plusplus': 0,
    'no-restricted-syntax': [
      2,
      'ForStatement',
      'ForInStatement',
      'ForOfStatement',
      'DoWhileStatement',
      'WhileStatement',
      'WithStatement',
      'TSEnumDeclaration',
    ],
    'no-undef': 2,
    'no-unused-vars': 2,
    'prefer-template': 2,
    'prettier/prettier': [
      'error',
      {},
      {
        usePrettierrc: true,
      },
    ],
    radix: 2,
    'react/destructuring-assignment': 2,
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'react/jsx-max-depth': [2, { max: 3 }],
    'react/jsx-no-literals': 0,
    'react/prop-types': 0,
    'react/self-closing-comp': [
      2,
      {
        component: true,
        html: true,
      },
    ],
    'react-hooks/exhaustive-deps': 2,
    'react-hooks/rules-of-hooks': 2,
  },
  overrides: [
    {
      files: ['src/**/*.test.tsx'],
      rules: {
        'testing-library/await-async-query': 0,
      },
    },
  ],
};
