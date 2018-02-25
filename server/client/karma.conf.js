const webpackConf = require('./webpack.config');

module.exports = function (config) {
  config.set({
    files: [
      'tests/helpers/**/*.js',
      'src/**/*.spec.js'
    ],
    autowatch: false,
    singleRun: true,
    port: process.env.PORT,
    colors: true,
    failOnEmptyTestSuite: true,
    frameworks: ['jasmine'],
    browsers: ['NoSandboxHeadlessChrome'],
    customLaunchers: {
      NoSandboxHeadlessChrome: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    reporters: ['spec'],
    specReporter: {
      suppressSkipped: true
    },
    preprocessors: {
      'src/**/*.spec.js': ['webpack', 'sourcemap'],
      'tests/**/*.js': ['webpack', 'sourcemap']
    },
    webpackMiddleware: {
      noInfo: true,
      stats: 'warn'
    },
    webpack: webpackConf
  });
};
