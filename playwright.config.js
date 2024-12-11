// playwright.config.ts
import { defineConfig } from "playwright/test";

export default defineConfig({
  name: "maddox-js-funcs-tests",
  testDir: "./tests/",
  use: {
    // This ensures no browser context is launched
    headless: false,
  },
});
