angular.module('app.services', [])

.factory('Locations', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 1,
    city: 'San Mateo',
    dealership: 'BMW San Mateo',
    image: 'img/bmw.png',
    geoX: 12.345,
    geoY: 12.345
  }, {
    id: 2,
    city: 'San Mateo',
    dealership: 'Tesla San Mateo',
    image: 'img/tesla.png',
    geoX: 12.345,
    geoY: 12.345
  }, {
    id: 3,
    city: 'San Mateo',
    dealership: 'Mazda San Mateo',
    image: 'img/mazda.png',
    geoX: 12.345,
    geoY: 12.345
  }, {
    id: 4,
    city: 'Vancouver',
    dealership: 'BMW Vancouver',
    image: 'img/bmw.png',
    geoX: 12.345,
    geoY: 12.345
  }, {
    id: 5,
    city: 'Vancouver',
    dealership: 'Tesla Vancouver',
    image: 'img/tesla.png',
    geoX: 12.345,
    geoY: 12.345
  }, {
    id: 6,
    city: 'Vancouver',
    dealership: 'Mazda Vancouver',
    image: 'img/mazda.png',
    geoX: 12.345,
    geoY: 12.345
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(locationId) {
      for (var i = 0; i < locations.length; i++) {
        if (locations[i].id === parseInt(locationId)) {
          return locations[i];
        }
      }
      return null;
    }
  }
})

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  // Some fake testing data
  var friends = [{
    id: 0,
    name: 'Ben Sparrow',
    notes: 'Enjoys drawing things',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    notes: 'Odd obsession with everything',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlen',
    notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    notes: 'I think he needs to buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    notes: 'Just the nicest guy',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];


  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})

 .factory('focus', function($timeout) {
  return function(id) {
    // timeout makes sure that it is invoked after any other event has been triggered.
    // e.g. click events that need to run before the focus or
    // inputs elements that are in a disabled state but are enabled when those events
    // are triggered.
    $timeout(function() {
      var element = document.getElementById(id);
      if(element)
        element.focus();
    });
  };
});
