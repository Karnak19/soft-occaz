module.exports = {
  printWidth: 130,
  singleQuote: true,
  trailingComma: "all",
  tabWidth: 2,
  arrowParens: "always",
  bracketSameLine: false,
  overrides: [
    {
      files: "*.json",
      options: {
        parser: "json",
      },
    },
  ],
};
