var $parseQuick, MOZ_HACK_REGEXP, PREFIX_REGEXP, SPECIAL_CHARS_REGEXP, app, camelCase, capitalize, directiveNormalize, eventDirectives, forceAsyncEvents;


/*
  Mostly a direct port of angular's event (basic ng-) directives. Except all binding is
  removed to increase performance / speed. This is specifically useful for ng-repeat.
 */

eventDirectives = {};

SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;

MOZ_HACK_REGEXP = /^moz([A-Z])/;

PREFIX_REGEXP = /^((?:x|data)[\:\-_])/i;


/**
Converts snake_case to camelCase.
Also there is special case for Moz prefix starting with upper case letter.
@param name Name to normalize
 */

camelCase = function(name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
    if (offset) {
      return letter.toUpperCase();
    } else {
      return letter;
    }
  }).replace(MOZ_HACK_REGEXP, "Moz$1");
};


/**
Converts all accepted directives format into proper directive name.
@param name Name to normalize
 */

directiveNormalize = function(name) {
  return camelCase(name.replace(PREFIX_REGEXP, ""));
};

capitalize = function(str) {
  return str.replace(/^./, function(match) {
    return match.toUpperCase();
  });
};

forceAsyncEvents = {
  blur: true,
  focus: true
};

$parseQuick = function(dotPropString, scope) {
  var toFind;
  toFind = void 0;
  dotPropString.split('.').forEach(function(path) {
    var newRoot;
    newRoot = !toFind ? scope : toFind;
    return toFind = newRoot[path];
  });
  return toFind;
};

'click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste'
.split(' ').forEach(function(eventName) {
  var directiveName, valuePropName;
  directiveName = directiveNormalize('rmaps-' + eventName);
  valuePropName = 'rmapsValueName' + capitalize(eventName);
  return eventDirectives[directiveName] = [
    '$parse', '$rootScope', '$log', function($parse, $rootScope, $log) {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          var elementScope;
          elementScope = element.scope();
          element.on('destroy', function() {
            // $log.debug('destroyed');
            return element.unbind(eventName);
          });
          return element.bind(eventName, function(event) {
            var callback, fn, fnNameToFind;
            fnNameToFind = attrs[directiveName];
            fn = $parseQuick(fnNameToFind, elementScope);
            if (!fn) {
              $log.error("failed to find function for " + directiveName + " to prop " + fnNameToFind);
            }
            callback = function() {
              return fn($parseQuick(attrs[valuePropName], element.scope()), {
                $event: event
              });
            };
            if (forceAsyncEvents[eventName] && $rootScope.$$phase) {
              return scope.$evalAsync(callback);
            } else {
              return scope.$apply(callback);
            }
          });
        }
      };
    }
  ];
});

module.directive(eventDirectives);
