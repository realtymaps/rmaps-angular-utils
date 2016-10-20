module.exports = (config) ->
  config.set
    basePath: ''
    frameworks: [ 'mocha','fixture','chai', 'expect']
    files: [
      'node_modules/angular/angular.js'
      'node_modules/angular-mocks/angular-mocks.js'
      'dist/rmaps-angular-utils.js'
      'spec/**/*.spec.coffee'
    ]
    exclude: []
    preprocessors: '**/*.coffee': [ 'coffee' ]
    reporters: [ 'progress' ]
    port: 9876
    colors: true
    logLevel: config.LOG_INFO
    autoWatch: true
    browsers: [ 'PhantomJS' ]
    singleRun: false
