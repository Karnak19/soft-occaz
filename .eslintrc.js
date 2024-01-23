module.exports = {
  extends: ['next', 'prettier', 'plugin:tailwindcss/recommended'],
  plugins: ['simple-import-sort', 'unused-imports', 'tailwindcss'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],
    '@next/next/no-img-element': 'off',
    'tailwindcss/classnames-order': 'error',
  },
  settings: {
    tailwindcss: {
      callees: ['cn', 'cva'],
      config: 'tailwind.config.js',
    },
    next: {
      rootDir: ['src'],
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
    },
  ],
};
