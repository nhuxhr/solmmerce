/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  roots: ["<rootDir>/tests"],
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 200000,
  transform: {
    "^.+\\.ts?$": ["ts-jest", { tsconfig: "./tsconfig.json" }],
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$",
};
