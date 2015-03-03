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
