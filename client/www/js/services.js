angular.module('app.services', [])

.factory('Map', function() {
  var map;
  var markers = [];

  //get current location from a config/localstorage id with default
  var myLatLng = new google.maps.LatLng(49.282899, -123.1096230);

  function init($el) {
    var mapOptions = {
      center: myLatLng,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map($el[0], mapOptions);

    // Stop the side bar from dragging when mousedown/tapdown on the map
    google.maps.event.addDomListener($el[0], 'mousedown', function (e) {
      e.preventDefault();
      return false;
    });

    addCurrentLocationMarker();
  }

  function addCurrentLocationMarker() {
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'You are here'
    });
    infowindow = new google.maps.InfoWindow({
      content: 'You are here'
    });
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, marker);
    });
    markers.push(marker);
  }

  function addMarker(loc) {
    var latlng = new google.maps.LatLng(loc.lat, loc.lng);
    var marker = new google.maps.Marker({
      position: latlng,
      map: map
    });
    marker.setVisible(true);
    marker.setMap(map);
    markers.push(marker);

    markers.push(marker);
  }

  function removeMarkers() {
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
  }

  return {
    init: init,
    addCurrentLocationMarker: addCurrentLocationMarker,
    addMarker: addMarker,
    removeMarkers: removeMarkers
  }
})

.factory('Locations', function() {
  var locations = [{
    id: 1,
    city: 'Vancouver',
    lat: 49.2840730,
    lng: -123.1119490
  }, {
    id: 2,
    city: 'Vancouver',
    lat: 49.2878210,
    lng: -123.1193530
  }, {
    id: 3,
    city: 'Vancouver',
    lat: 49.2905060,
    lng: -123.1284980
  }];

  function find(city) {
    if (!city) return;

    function startsWith(needle, haystack) {
      return haystack.substr(0, needle.length) === needle;
    }
    var matches = [];
    locations.forEach(function(loc) {
      if (startsWith(city.toLowerCase(), loc.city.toLowerCase()))
        matches.push(loc);
    });
    return matches;
  }

  return {
    find: find
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
