;(function(ng) {
/**
*  rmaps-angular-utils
*
* @version: 1.1.0
* @author: RealtyMapster LLC
* @date: Thu Oct 20 2016 15:14:34 GMT-0400 (EDT)
* @license: MIT
*/var module = null;
try{
  module = ng.module('rmaps-utils');
}
catch(err){
  module = ng.module('rmaps-utils',[]);
}
var directiveName;

directiveName = 'rmapsPostRepeat';

module.directive(directiveName, [
  '$log', function($log) {
    var postRepeat;
    postRepeat = {};
    return {
      scope: {
        options: '='
      },
      link: function(scope, element, attrs) {
        var attrScope, opts, parent;
        attrScope = scope.$parent;
        parent = attrScope.$parent;
        if (attrScope.$first) {
          postRepeat[parent.$id] = {
            lastTime: new Date()
          };
          parent.$on('$destroy', function() {
            return delete postRepeat[parent.$id];
          });
        }
        if (scope.options != null) {
          opts = scope.options;
          if ((opts.init != null) && ng.isFunction(opts.init)) {
            opts.init(postRepeat[parent.$id], scope);
          }
        }
        if (attrScope.$last) {
          return scope.$evalAsync(function() {
            var doDelete;
            $log.debug('## DOM rendering list took: ' + (new Date() - postRepeat[parent.$id].lastTime) + ' ms');
            doDelete = (!opts || opts.doDeleteLastTime == null) ? true : opts.doDeleteLastTime;
            if (doDelete) {
              return delete postRepeat[parent.$id];
            }
          });
        }
      }
    };
  }
]);

}(angular));