const { defineConfig } = require("cypress");

const APP_BASE_URL = process.env.APP_BASE_URL ?? "https://front.serverest.dev";
const API_BASE_URL = process.env.API_BASE_URL ?? "https://serverest.dev";

module.exports = defineConfig({
  e2e: {
    baseUrl: APP_BASE_URL,
    viewportWidth: 1440,
    viewportHeight: 900,

    retries: { runMode: 2 },

    video: false,

    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      reportDir: "cypress/reports",
      charts: true,
      reportPageTitle: "Suíte de testes — ServeRest",
      embeddedScreenshots: true,
      inlineAssets: true,
    },

    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },
  },

  env: {
    apiUrl: API_BASE_URL,
  },
});
