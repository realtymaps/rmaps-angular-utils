gulp = require 'gulp'
ourPackage = require './package.json'

uglify = require 'gulp-uglify'
insert = require 'gulp-insert'
concat = require 'gulp-concat'
del = require 'del'
log = require('gulp-util').log
Karma = require('karma').Server
series = require 'gulp-sequence'

date = new Date()

safeWrapBegin = """(function(ng){
  var module = null;
  module = ng.module('rmaps-utils',[]);
  """
safeWrapEnd = "})(angular);"

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


gulp.task 'build', ->
  gulp.src(['src/*.js', 'src/**/*.js'])
  .pipe(concat('rmaps-angular-utils.js'))
  .pipe(insert.prepend(header))
  .pipe(insert.prepend(safeWrapBegin))
  .pipe(insert.append(safeWrapEnd))
  .pipe(gulp.dest(dest))
  .pipe(uglify(mangle:false)).on 'error', (err) ->
    log err
  .pipe(concat 'rmaps-angular-utils.min.js')
  .pipe(insert.prepend(header))
  .pipe(gulp.dest(dest))


gulp.task 'default', series('clean','build', 'spec')

gulp.task 'clean', (cb) ->
  del(['dist/'], force: true, cb)

gulp.task 'spec', (done) ->
  server = new Karma({
    configFile: __dirname + '/karma.conf.coffee'
    singleRun: true}
  , done)
  server.start()
