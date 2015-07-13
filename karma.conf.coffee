# Karma configuration
# Generated on Mon Jul 13 2015 15:07:30 GMT-0400 (EDT)
mainBowerFiles = require 'main-bower-files'

files = mainBowerFiles().concat [
  'bower_components/lodash/lodash.js'
  'dist/rmaps-angular-utils.js'
  'spec/**/*.spec.coffee'
]

module.exports = (config) ->
  config.set
    basePath: ''
    frameworks: [ 'mocha','fixture','chai', 'expect']
    files: files
    exclude: []
    preprocessors: '**/*.coffee': [ 'coffee' ]
    reporters: [ 'progress' ]
    port: 9876
    colors: true
    logLevel: config.LOG_INFO
    autoWatch: true
    browsers: [ 'PhantomJS' ]
    singleRun: false
