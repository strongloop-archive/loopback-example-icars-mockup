angular.module('app.services', [])

.factory('Map', function() {
  var map;
  var markers = [];

  //get current location from a config/localstorage id with default
  var myLatLng = new google.maps.LatLng(37.4472200, -122.1586140);

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
    title: 'Parker BMW',
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
    dealer: 'Parker BMW',
    logo: 'img/bmw.png',
    image: 'img/1-series.jpg',
    city: 'Vancouver',
    address: '2311 Boundary Road',
    model: '1 Series Coupe',
    price: '$60,000'
  }, {
    id: 2,
    locationId: 1,
    dealer: 'AutoWest BMW',
    logo: 'img/bmw.png',
    image: 'img/m3.jpg',
    city: 'Vancouver',
    address: '4391 Kingsway Street',
    model: 'M3',
    price: '$90,000'
  }, {
    id: 3,
    locationId: 2,
    dealer: 'Tesla Vancouver',
    logo: 'img/tesla.png',
    image: 'img/model-s.jpg',
    city: 'Vancouver',
    address: '957 Nanaimo Drive',
    model: 'Model S',
    price: '$200,000'
  }, {
    id: 4,
    locationId: 2,
    dealer: 'Joe Forte Tesla',
    logo: 'img/tesla.png',
    image: 'img/model-x.jpg',
    city: 'Vancouver',
    address: '1954 Killarney Road',
    model: 'Model X',
    price: '$160,000'
  }, {
    id: 5,
    locationId: 3,
    dealer: 'Burnaby Mazda',
    logo: 'img/mazda.png',
    image: 'img/miata.jpg',
    city: 'Vancouver',
    address: '3984 Willingdon Road',
    model: 'Mazda Miata 2015',
    price: '$30,000'
  }, {
    id: 6,
    locationId: 3,
    dealer: 'Mazda Downtown',
    logo: 'img/mazda.png',
    image: 'img/shinari.jpg',
    city: 'Vancouver',
    address: '479 Alberi Street',
    model: 'Mazda Shinari',
    price: '$500,000'
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

  function findByItemId(id) {
    var match;
    listings.forEach(function(item) {
      if (item.id == id)
        match = item;
    });
    return match;
  }

  return {
    find: find,
    findByLocationId: findByLocationId,
    findByItemId: findByItemId
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
