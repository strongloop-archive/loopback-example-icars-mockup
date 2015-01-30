angular.module('app.directives', [])

.directive('map', function(Map) {
  return {
    restrict: 'E',
    link: function ($scope, $el, $attr) {
      if (document.readyState === "complete")
        return Map.init($el);
      google.maps.event.addDomListener(window, 'load', init);
    }
  }
})

.directive('eventFocus', function(focus) {
  return function(scope, elem, attr) {
    elem.on(attr.eventFocus, function() {
      focus(attr.eventFocusId);
    });

    // Removes bound events in the element itself
    // when the scope is destroyed
    scope.$on('$destroy', function() {
      element.off(attr.eventFocus);
    });
  };
});
