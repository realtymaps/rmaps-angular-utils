
cap = (string) ->
  string.charAt(0).toUpperCase() + string.slice(1)

describe 'rootElement', ->
  beforeEach ->
    angular.mock.module 'rmaps-utils'
    inject (_$rootScope_, _$compile_) =>
      @$rootScope = _$rootScope_
      @$scope = _$rootScope_.$new();
      @$compile = _$compile_

  describe 'broadcast', ->
    ['click', 'dblclick', 'mouseover'].forEach (name) ->
      it name, ->
        element = angular.element('<div id="test" rmaps-root-event ><div/>')

        element = @$compile(element)(@$scope)
        bodyEventHit = false
        @$rootScope.$on 'rmapsRoot' + cap(name), ->
          bodyEventHit = true

        element.triggerHandler(name)
        @$rootScope.$digest()
        bodyEventHit.should.be.ok
