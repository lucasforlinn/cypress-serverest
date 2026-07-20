const js = require("@eslint/js");
const pluginCypress = require("eslint-plugin-cypress");
const prettier = require("eslint-config-prettier");

module.exports = [
  js.configs.recommended,
  prettier,
  {
    files: ["cypress/**/*.js"],
    plugins: { cypress: pluginCypress },
    languageOptions: {
      globals: { ...pluginCypress.configs.globals.languageOptions.globals },
    },
    rules: {
      "cypress/no-unnecessary-waiting": "error",
      "cypress/no-assigning-return-values": "error",
      "cypress/no-xpath": "error",
      "cypress/unsafe-to-chain-command": "error",
      "cypress/no-async-tests": "error",
      "cypress/no-force": "error",
      "cypress/no-debug": "error",
      "cypress/no-pause": "error",
      "cypress/assertion-before-screenshot": "error",
    },
  },
  {
    files: ["cypress.config.js", "eslint.config.js"],
    languageOptions: {
      globals: { require: "readonly", module: "writable", process: "readonly" },
    },
  },
];
