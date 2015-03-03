# rmaps-angular-utils
Open source of set of angular directives and services.

## ngReplacements
This covers any basic ng-'some-event' directive but it is used in a different way without
any binding/watches. This is very handy for speedy ng-repeat when you do not need to make a list watch everything. However, this does mean that you are responsible for refreshing the view
if the data changes.

The same:
ng-click ~ rmaps-click
ng-mousenter ~ rmaps-mouseenter

all point to handles on your controller scope.

The different:
**rmaps-value-name-{eventname}**

This attribute is where you define what scope property is being sent to the callback.

Example:

Html:
```
<div>
  <div ng-repeat="result in results" rmaps-click="someClickHandle" rmaps-value-name-click="result">
  </div>
</div>
```
Js/Controller:
```
//your normal controller setup
mod.controller('ctrl',function($scope){
  $scope.someClickHandle = function(result){
    alert(result);
  };
});
```

##ngOnEvents
This is for getting callback events (load,error) from a element. The attribute you set rmaps-on-error or load to evaluates the expression to a callback.

Example:
```
<div rmaps-on-load="onLoadInCtrl"></div>
```

##rmapsPostRepeat
This directive is for reporting timings of ng-repeat load times.
Use:
```
<div ng-repeat="r in results" rmaps-post-repeat options="perfRepeatOptions"></div>
```

The options is mainly there so that you can override the default behavior of resting the the timer on a ng-repeat completion. This is convenient for thing like infinite scroll.

```
ctrl = function($scope){
  $scope.resultsRepeatPerf = {
    //called on initialization
    init: function (postRepeat, scope){
      //a way to get to the postRepeat object and or modify its timer
    };
    doDeleteLastTime: false
  };
};
```
