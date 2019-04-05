module.exports = {
  roots: [
    "<rootDir>/src",
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node",
  ],
  collectCoverage: true,
  setupFilesAfterEnv: [
    "<rootDir>src/test-shim.js",
    "<rootDir>src/test-setup.js"
  ],
}
