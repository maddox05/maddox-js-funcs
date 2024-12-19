import { defineConfig } from "playwright/test";

export default defineConfig({
  name: "maddox-js-funcs-tests",
  testDir: "./tests/",
  use: {
    headless: false,
  },
});
