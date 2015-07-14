;(function(ng) {
/**
*  rmaps-angular-utils
*
* @version: 1.0.0
* @author: RealtyMapster LLC
* @date: Mon Jul 13 2015 17:36:04 GMT-0400 (EDT)
* @license: MIT
*/var module = null;
try{
  module = ng.module('rmaps-utils');
}
catch(err){
  module = ng.module('rmaps-utils',[]);
}
var events;

events = ['load', 'error'];

events.forEach(function(eventname) {
  return module.directive("rmapsOn" + eventname, function() {
    return {
      scope: false,
      link: function(scope, element, attrs) {
        var callback;
        callback = scope.$eval(attrs["rmapsOn" + eventname]);
        return element.on(eventname, function(event) {
          var ret;
          ret = callback(event);
          scope.$evalAsync(function() {});
          return ret;
        });
      },
      restrict: 'A'
    };
  });
});

}(angular));