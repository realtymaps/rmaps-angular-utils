;(function(ng) {
/**
*  rmaps-angular-utils
*
* @version: 1.1.0
* @author: RealtyMapster LLC
* @date: Thu Oct 20 2016 15:08:48 GMT-0400 (EDT)
* @license: MIT
*/var module = null;
try{
  module = ng.module('rmaps-utils');
}
catch(err){
  module = ng.module('rmaps-utils',[]);
}
var events, defaultElements;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

defaultEvents = ['click', 'dblclick', 'mouseover'];

return module.directive('rmapsRootEvent', [ '$rootScope', function($rootScope) {
  return {
    scope: false,
    link: function(scope, element, attrs) {
      var logic = scope.$eval(attrs['rmaps-logic']) || '$broadcast',
        events = scope.$eval(attrs['rmaps-events']) || defaultEvents,
        globalEventName;
      events.forEach(function(eventname){
        element.on(eventname, function(event) {
          globalEventName = 'rmapsRoot' + capitalizeFirstLetter(eventname);
          $rootScope[logic](globalEventName, event);
        });
      });
    },
    restrict: 'A'
  };
}]);

}(angular));