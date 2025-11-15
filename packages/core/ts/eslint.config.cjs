const rootConfig = require("../../../eslint.config.cjs");
const tsEslintPlugin = require("@typescript-eslint/eslint-plugin");

module.exports = [
  ...rootConfig,
  {
    files: ["**/*.ts"],
    ignores: ["node_modules/**", "dist/**", ".tsbuildinfo"],
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        project: "./tsconfig.eslint.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsEslintPlugin,
    },
    rules: {
      // Package-specific overrides
      "@typescript-eslint/explicit-function-return-type": "off",
    },
  },
];
