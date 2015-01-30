angular.module('app.controllers', [])

.controller('HomeCtrl', function($scope) {})

.controller('LocationsCtrl', function($rootScope, focus, $scope, Map,
    Locations) {
  //since tabs are cached (meaning the controllers only load once), we need to
  //refocus the search field manually when changing tabs
  $rootScope.$on('$ionicView.enter', function() {
    focus('search');
  });

  $scope.location = {
    city: '',
    lat: 0,
    lng: 0
  };

  $scope.search = function(city) {
    Map.removeMarkers();
    var locs = Locations.find(city)
    if (locs) {
      locs.forEach(function(loc) {
        Map.addMarker(loc);
      });
    }
    if (!city)
      Map.addCurrentLocationMarker();
    Map.center();
  };
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});


