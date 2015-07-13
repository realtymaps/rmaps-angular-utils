gulp = require 'gulp'
ourPackage = require './package.json'
fs = require 'fs'

jshint = require 'gulp-jshint'
uglify = require 'gulp-uglify'
insert = require 'gulp-insert'
concat = require 'gulp-concat'
jswrap = require 'gulp-js-wrapper'
del = require 'del'
exec = require('child_process').exec
log = require('gulp-util').log
jasmine = require 'gulp-jasmine2-phantomjs'
coffee = require 'gulp-coffee'
es = require 'event-stream'
karma = require('karma').server

module = fs.readFileSync(__dirname + '/src/wrap/module.js', 'utf8');

date = new Date()

header = """
/**
*  #{ourPackage.name}
*
* @version: #{ourPackage.version}
* @author: #{ourPackage.author}
* @date: #{date.toString()}
* @license: #{ourPackage.license}
*/
"""
dest = 'dist'

jsWrapOpts =
  # pass a safe undefined into the encapsulation
  safeUndef: false,
  globals:
      'angular': 'ng'

gulp.task 'build', ->
  gulp.src([
    'src/*.js'
    'src/**/*.js'
    '!src/wrap/*.js'])
  .pipe(insert.prepend(module))
  .pipe(insert.prepend(header))
  .pipe(jswrap jsWrapOpts)
  .pipe(gulp.dest(dest))
  .pipe(concat 'rmaps-angular-utils.js')
  .pipe(gulp.dest(dest))
  .pipe(uglify(mangle:false)).on 'error', (err) ->
    console.log err
  .pipe(concat 'rmaps-angular-utils.min.js')
  .pipe(insert.prepend(header))
  .pipe(gulp.dest(dest))


gulp.task 'default', ['clean','build']

gulp.task 'clean', (cb) ->
  try
    cleanDest = fs.readFileSync(__dirname + '/dest', 'utf8');
  unless cleanDest
    return cb()
  del([
    'dist/',
  ], force: true, cb)

gulp.task 'bower', (cb) ->
  exec 'bower install', (error, stdout, stderr) ->
    log('\n'+stdout)
    cb()


gulp.task 'spec', (done) ->
  karma.start
    configFile: __dirname + '/karma.conf.coffee',
    singleRun: true
  , done
