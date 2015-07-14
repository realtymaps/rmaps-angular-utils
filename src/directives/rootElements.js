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
