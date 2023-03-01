const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsonc/recommended-with-jsonc',
    'prettier'
  ],
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    },
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: '@typescript-eslint/parser'
      },
      rules: {
        'no-undef': 'off'
      }
    },
    {
      files: ['*.json', '*.json5', '*.jsonc'],
      parser: 'jsonc-eslint-parser'
    },
    {
      files: ['package.json'],
      parser: 'jsonc-eslint-parser',
      rules: {
        'jsonc/sort-keys': [
          'error',
          {
            pathPattern: '^$',
            order: [
              'name',
              'version',
              'private',
              'packageManager',
              'description',
              'type',
              'keywords',
              'homepage',
              'bugs',
              'license',
              'author',
              'contributors',
              'funding',
              'files',
              'main',
              'module',
              'exports',
              'unpkg',
              'jsdelivr',
              'browser',
              'bin',
              'man',
              'directories',
              'repository',
              'publishConfig',
              'scripts',
              'peerDependencies',
              'peerDependenciesMeta',
              'optionalDependencies',
              'dependencies',
              'devDependencies',
              'engines',
              'config',
              'overrides',
              'pnpm',
              'husky',
              'lint-staged',
              'eslintConfig'
            ]
          },
          {
            pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$',
            order: { type: 'asc' }
          }
        ]
      }
    }
  ],
  rules: {
    'prettier/prettier': 'error',

    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-var': 'error',
    'prefer-arrow-callback': 'error',
    'arrow-parens': ['error', 'always'],
    'sort-imports': [
      'warn',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: false
      }
    ],

    '@typescript-eslint/semi': ['error', 'never'],
    '@typescript-eslint/no-extra-semi': 'off',
    '@typescript-eslint/quotes': ['error', 'single'],
    '@typescript-eslint/comma-dangle': ['error', 'never'],
    // '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/consistent-type-imports': ['error', { disallowTypeAnnotations: false }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-empty-function': 'off',

    'vue/multi-word-component-names': 'off',
    'vue/prefer-import-from-vue': 'warn',

    'import/first': 'error',
    'import/no-duplicates': 'error',
    'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroups: [
          {
            pattern: 'vue',
            group: 'external',
            position: 'before'
          },
          {
            pattern: '@vue/**',
            group: 'external',
            position: 'before'
          },
          {
            pattern: '@luna-view/**',
            group: 'internal'
          }
        ],
        pathGroupsExcludedImportTypes: ['type']
      }
    ],
    'import/no-unresolved': 'off',
    'import/namespace': 'off',
    'import/default': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/named': 'off'
  }
})
