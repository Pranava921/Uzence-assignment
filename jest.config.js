/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",          // needed for testing React components
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"], // see next step
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
