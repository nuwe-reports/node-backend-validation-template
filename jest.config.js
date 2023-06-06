/** @type {import('jest').Config} */
    const config = {
        verbose :true,
        collectCoverage: true,
        coverageProvider: "v8",
        coverageReporters: ["json", "json-summary"],
        testFailureExitCode: 0,
    }

module.exports = config;
