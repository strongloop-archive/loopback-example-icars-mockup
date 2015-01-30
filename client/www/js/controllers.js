angular.module('app.controllers', [])

.controller('HomeCtrl', function($scope) {})

.controller('LocationsCtrl', function($rootScope, focus, $scope, Map,
    Locations) {
  //since tabs are cached (meaning the controllers only load once), we need to
  //refocus the search field manually when changing tabs
  $rootScope.$on('$ionicView.enter', function() {
    //focus('search');
    cordova.plugins.Keyboard.show();
  });

  $scope.location = {
    city: ''
  };

  $scope.search = function(city) {
    Map.removeMarkers();
    var locs = Locations.find(city)
    if (locs)
      locs.forEach(function(loc) {
        Map.addMarker(loc);
      });
    if (!city)
      Map.addCurrentLocationMarker();
    Map.center();
  };
})

.controller('ListingsCtrl', function($scope, $stateParams, Listings) {
  $scope.items = !$stateParams.locationId ?
      Listings.find() :
      Listings.findByLocationId($stateParams.locationId);
})

.controller('ListingsItemCtrl', function($scope, $stateParams, Listings) {
  $scope.item = Listings.findByItemId($stateParams.itemId);
})

.controller('SettingsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('InfoCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
