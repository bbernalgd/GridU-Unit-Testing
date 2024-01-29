module.exports = {
  collectCoverageFrom: ["./unitTestingTask.js"],
  coverageReporters: ["html", "json"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
