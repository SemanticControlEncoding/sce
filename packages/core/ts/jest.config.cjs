const { defaults: tsjPreset } = require("ts-jest/presets");

module.exports = {
  ...tsjPreset,
  testEnvironment: "node",
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  transform: {
    ...tsjPreset.transform,
    "^.+\\.[tj]sx?$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.jest.json",
      },
    ],
  },
};
