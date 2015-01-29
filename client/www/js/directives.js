angular.module('app.directives', [])

.directive('map', function() {
  return {
    restrict: 'E',
    scope: {
      onCreate: '&'
    },
    link: function ($scope, $element, $attr) {
      var initLatlng = new google.maps.LatLng(49.282899, -123.1096230);

      function initialize() {
        var mapOptions = {
          center: initLatlng,
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map($element[0], mapOptions);

        $scope.onCreate({map: map});

        // Stop the side bar from dragging when mousedown/tapdown on the map
        google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
          e.preventDefault();
          return false;
        });

        var marker = new google.maps.Marker({
          position: initLatlng,
          map: map,
          title: 'You are here'
        });
        infowindow = new google.maps.InfoWindow({
          content: 'You are here'
        });
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map, marker);
        });
      }

      $scope.showListingsForDealer = function(lat, lng) {
        //determine the view to show using a matching latlng, and change
        //to the listing page
      };

      if (document.readyState === "complete") {
        initialize();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }
    }
  }
})

.directive('autoFocus', function($timeout) {
  return {
    restrict: 'AC',
    link: function(_scope, _element) {
      $timeout(function(){
        _element[0].focus();
      }, 0);
    }
  };
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
