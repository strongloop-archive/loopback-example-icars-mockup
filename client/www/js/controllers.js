angular.module('app.controllers', [])

.controller('HomeCtrl', function($scope) {})

.controller('LocationsCtrl', function($scope, Locations, focus) {
  focus('search');

  $scope.locations = Locations.all();

  $scope.remove = function(location) {
    Locations.remove(location);
  };

  $scope.location = {
    city: ''
  };

  $scope.search = function() {
    console.log(arguments)
  };
})
.controller('MapCtrl', function($scope) {
  $scope.mapCreated = function(map) {
    $scope.map = map;
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


