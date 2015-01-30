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
      map: map,
      html: '<a href="#/tab/listings/' + loc.id + '">' + loc.title + '</a>'
    });
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(this.html);
      infowindow.open(map, this);
    });
    markers.push(marker);
  }

  function center() {
    //  Create a new viewpoint bound
    var bounds = new google.maps.LatLngBounds();
    //  Go through each...
    markers.forEach(function(marker) {
      bounds.extend(marker.position);
    });
    //  Fit these bounds to the map
    map.fitBounds(bounds);
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
    center: center,
    removeMarkers: removeMarkers
  }
})

.factory('Locations', function() {
  var locations = [{
    id: 1,
    city: 'Vancouver',
    title: 'Brian Jessel BMW BMW', //hack, map rendering with the last word missing
    lat: 49.2840730,
    lng: -123.1119490
  }, {
    id: 2,
    city: 'Vancouver',
    title: 'Tesla Vancouver',
    lat: 49.2878210,
    lng: -123.1193530
  }, {
    id: 3,
    city: 'Vancouver',
    title: 'Mazda Vancouver',
    lat: 49.2905060,
    lng: -123.1284980
  }, {
    id: 4,
    city: 'San Mateo',
    title: 'BMW San Mateo',
    lat: 47.2878210,
    lng: -123.1193530
  }, {
    id: 5,
    city: 'San Mateo',
    title: 'Tesla San Mateo',
    lat: 47.2905060,
    lng: -123.1284980
  }, {
    id: 6,
    city: 'San Mateo',
    title: 'Mazda San Mateo',
    lat: 47.2905060,
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
.factory('Listings', function() {
  var listings = [{
    id: 1,
    locationId: 1,
    dealer: 'Brian Jessel BMW',
    image: 'img/bmw.png',
    city: 'Vancouver',
    address: '2311 Boundary Road',
    model: '1 Series Coupe'
  }, {
    id: 2,
    locationId: 1,
    dealer: 'AutoWest BMW',
    image: 'img/bmw.png',
    city: 'Vancouver',
    address: '4391 Kingsway Street',
    model: 'M3'
  }, {
    id: 3,
    locationId: 2,
    dealer: 'Tesla Vancouver',
    image: 'img/tesla.png',
    city: 'Vancouver',
    address: '957 Nanaimo Drive',
    model: 'Model S'
  }, {
    id: 4,
    locationId: 2,
    dealer: 'Joe Forte Tesla',
    image: 'img/tesla.png',
    city: 'Vancouver',
    address: '1954 Killarney Road',
    model: 'Model X'
  }, {
    id: 5,
    locationId: 3,
    dealer: 'Burnaby Mazda',
    image: 'img/mazda.png',
    city: 'Vancouver',
    address: '3984 Willingdon Road',
    model: 'Mazda Miata 2015'
  }, {
    id: 6,
    locationId: 3,
    dealer: 'Mazda Downtown',
    image: 'img/mazda.png',
    city: 'Vancouver',
    address: '479 Alberi Street',
    model: 'Mazda Shinari'
  }];

  function find() {
    return listings;
  }

  function findByLocationId(id) {
    var matches = [];
    listings.forEach(function(item) {
      if (item.locationId == id)
        matches.push(item);
    });
    return matches;
  };

  return {
    find: find,
    findByLocationId: findByLocationId
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
