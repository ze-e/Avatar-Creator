module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  overrides: [
    {
      files: ['*-test.js', '*.spec.js', '*.js'],
      rules: {
        'multiline-ternary': 'off',
        'no-extra-boolean-cast': 'off',
        'import/no-anonymous-default-export': 'off'
      }
    }
  ]
}
