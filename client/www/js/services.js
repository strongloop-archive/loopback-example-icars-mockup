angular.module('app.services', [])

.factory('Map', function(Locations) {
  var map;
  var markers = [];

  //get current location from a config/localstorage id with default
  var myLatLng = new google.maps.LatLng(37.4472200, -122.1586140);

  function init($el) {
    var mapOptions = {
      center: myLatLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map($el[0], mapOptions);

    // Stop the side bar from dragging when mousedown/tapdown on the map
    google.maps.event.addDomListener($el[0], 'mousedown', function (e) {
      e.preventDefault();
      return false;
    });

    var locs = Locations.findAll();
    locs.forEach(function(loc) {
      addMarker(loc);
    });
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
    console.log(loc.title);
    var content = '<div class="gm-style-iw" style="max-width:400px;line-height:normal;white-space:nowrap;overflow:auto;"><a href="#/tab/listings/' + loc.id + '">' + loc.title + '</a></div>';
    var infowindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', function() {
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
    city: 'Palo Alto',
    title: 'iCars Downtown Palo Alto',
    lat: 37.4472200,
    lng: -122.1586140
  }, {
    id: 2,
    city: 'Stanford',
    title: 'iCars Stanford',
    lat: 37.4319310,
    lng: -122.1823700
  }, {
    id: 3,
    city: 'Palo Alto',
    title: 'iCars East Palo Alto',
    lat: 37.4224740,
    lng: -122.1045870
  }, {
    id: 4,
    city: 'Menlo Park',
    title: 'iCars Menlo Park',
    lat: 37.4833580,
    lng: -122.1701460
  }, {
    id: 5,
    city: 'Mountain View',
    title: 'iCars Mountain View',
    lat: 37.3857160,
    lng: -122.0845530
  }, {
    id: 6,
    city: 'Redwood City',
    title: 'iCars Redwood City',
    lat: 37.4704120,
    lng: -122.2127590
  }];

  function findAll() {
    return locations;
  }

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
    find: find,
    findAll: findAll
  }
})

/**
 * A simple example service that returns some data.
 */
.factory('Listings', function() {
  var listings = [{
    id: 1,
    locationId: 1,
    dealer: 'iCars Downtown Palo Alto',
    logo: 'img/bmw.png',
    image: 'img/1-series.jpg',
    city: 'Palo Alto',
    address: '459 Hamilton Ave, CA 94301',
    model: '1 Series Coupe',
    price: '$6,000'
  }, {
    id: 2,
    locationId: 2,
    dealer: 'iCars Stanford',
    logo: 'img/bmw.png',
    image: 'img/m3.jpg',
    city: 'Stanford',
    address: '360 Oak Road, CA 94305',
    model: 'M3',
    price: '$9,000'
  }, {
    id: 3,
    locationId: 3,
    dealer: 'iCars East Palo Alto',
    logo: 'img/tesla.png',
    image: 'img/model-s.jpg',
    city: 'Palo Alto',
    address: '811 East Charleston Road, CA 94303',
    model: 'Model S',
    price: '$20,000'
  }, {
    id: 4,
    locationId: 4,
    dealer: 'iCars Menlo Park',
    logo: 'img/tesla.png',
    image: 'img/model-x.jpg',
    city: 'Menlo Park',
    address: '205 Constitution Drive, CA 94025',
    model: 'Model X',
    price: '$16,000'
  }, {
    id: 5,
    locationId: 5,
    dealer: 'iCars Mountain View',
    logo: 'img/mazda.png',
    image: 'img/miata.jpg',
    city: 'Mountain View',
    address: '809 Weste El Camino Real, CA 94040',
    model: 'Mazda Miata 2015',
    price: '$1,000'
  }, {
    id: 6,
    locationId: 6,
    dealer: 'iCars Redwood City',
    logo: 'img/mazda.png',
    image: 'img/shinari.jpg',
    city: 'Redwood City',
    address: '2821 El Camino Real',
    model: 'Mazda Shinari',
    price: '$50,000'
  }, {
    id: 7,
    locationId: 5,
    dealer: 'iCars Downtown Palo Alto',
    logo: 'img/bmw.png',
    image: 'img/m3.jpg',
    city: 'Palo Alto',
    address: '459 Hamilton Ave, CA 94301',
    model: 'M3',
    price: '$9,000'
  }, {
    id: 8,
    locationId: 1,
    dealer: 'iCars Downtown Palo Alto',
    logo: 'img/tesla.png',
    image: 'img/model-s.jpg',
    city: 'Palo Alto',
    address: '459 Hamilton Ave, CA 94301',
    model: 'Model S',
    price: '$20,000'
  }, {
    id: 10,
    locationId: 1,
    dealer: 'iCars Downtown Palo Alto',
    logo: 'img/mazda.png',
    image: 'img/miata.jpg',
    city: 'Palo Alto',
    address: '459 Hamilton Ave, CA 94301',
    model: 'Mazda Miata 2015',
    price: '$1,000'
  }, {
    id: 12,
    locationId: 2,
    dealer: 'iCars Stanford',
    logo: 'img/bmw.png',
    image: 'img/1-series.jpg',
    city: 'Stanford',
    address: '360 Oak Road, CA 94305',
    model: '1 Series Coupe',
    price: '$6,000'
  }, {
    id: 13,
    locationId: 2,
    dealer: 'iCars Stanford',
    logo: 'img/tesla.png',
    image: 'img/model-s.jpg',
    city: 'Stanford',
    address: '360 Oak Road, CA 94305',
    model: 'Model S',
    price: '$20,000'
  }, {
    id: 14,
    locationId: 3,
    dealer: 'iCars Stanford',
    logo: 'img/tesla.png',
    image: 'img/model-x.jpg',
    city: 'Stanford',
    address: '360 Oak Road, CA 94305',
    model: 'Model X',
    price: '$16,000'
  }, {
    id: 15,
    locationId: 4,
    dealer: 'iCars Stanford',
    logo: 'img/mazda.png',
    image: 'img/miata.jpg',
    city: 'Stanford',
    address: '360 Oak Road, CA 94305',
    model: 'Mazda Miata 2015',
    price: '$1,000'
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
