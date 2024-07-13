module.exports = {
   parser: '@typescript-eslint/parser',
   parserOptions: {
      project: 'tsconfig.json',
      tsconfigRootDir: __dirname,
      sourceType: 'module',
   },
   plugins: ['@typescript-eslint/eslint-plugin', 'perfectionist'],
   extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
      'plugin:perfectionist/recommended-alphabetical',
   ],
   root: true,
   env: {
      node: true,
      jest: true,
   },
   ignorePatterns: ['.eslintrc.js', 'src/generated'],
   rules: {
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
      'import/prefer-default-export': 'off',
      'no-plusplus': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'prefer-const': 'warn',
      'function-paren-newline': 'off',
      'object-shorthand': 'warn',
      'no-multi-spaces': 'error',
      'no-restricted-imports': 'warn',
      quotes: ['error', 'single'],
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'perfectionist/sort-interfaces': 'error',
      'prettier/prettier': [
         'error',
         {
            endOfLine: 'auto',
         },
      ],
      'max-len': [
         'error',
         {
            code: 110,
            ignorePattern: 'd="([\\s\\S]*?)"',
         },
      ],
      'max-lines': [
         'error',
         {
            max: 600,
            skipBlankLines: true,
            skipComments: true,
         },
      ],
      'no-console': [
         'warn',
         {
            allow: ['warn', 'error'],
         },
      ],
      'import/order': [
         'error',
         {
            alphabetize: {
               order: 'asc',
               caseInsensitive: true,
            },
            groups: [
               'builtin',
               'external',
               'internal',
               'parent',
               'sibling',
               'index',
               'object',
               'type',
            ],
         },
      ],
   },
};
