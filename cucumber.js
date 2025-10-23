module.exports = {
  default: {
    require: ['src/steps/**/*.ts', 'src/hooks/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'json:reports/cucumber-report.json',
      'html:reports/cucumber-report.html',
      'progress-bar'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    publishQuiet: true,
    parallel: 2
  }
};