function initMap() {
  var myLatLng = { lat: 35.90286339, lng: -78.62558617 };
  var markerIcon = "/images/parking-lot-maps.png";
  var bounds = new google.maps.LatLngBounds();
  //var position;
  var marker;

  var parks;
  // Create a map object and specify the DOM element
  // for display.
  var map = new google.maps.Map(document.getElementById("map"), {
    center: myLatLng,
    zoom: 10
  });

  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  $.get("api/parks", function(data) {
    if (data) {
      parks = data;
      //console.log(data);
    }
  }).then(function() {
    //console.log({ lat: parks[0].lat, lng: parks[0].lon });

    for (var i = 0; i < parks.length; i++) {
      if (isEmpty(parks[i].lat) || isEmpty(parks[i].lon)) {
      } else {
        var lat = parseFloat(parks[i].lat);
        var lng = parseFloat(parks[i].lon);
        addMarker({ lat: lat, lng: lng }, parks[i].name);
      }
    }
    map.fitBounds(bounds);
  });

  function addMarker(coords, name) {
    var marker = new google.maps.Marker({
      map: map,
      position: new google.maps.LatLng(coords.lat, coords.lng),
      title: name
    });
    console.log(coords.lat, coords.lng);
    bounds.extend(marker.position);
  }

  // Create a marker and set its position.
  //   var marker = new google.maps.Marker({
  //     map: map,
  //     position: myLatLng,
  //     title: "Hello World!"
  //   });

  //   var parkName = "Honeycutt Park";
  //   var parkAddress = "123 Jones St. Raleigh, NC 21254";

  //   var infoWindow = new google.maps.InfoWindow({
  //     content:
  //       "<h1>" +
  //       parkName +
  //       "</h1><h3>" +
  //       parkAddress +
  //       "</h3><h4><a href='page.html'>Pick this Park</a></h4>"
  //   });

  //   marker.addListener("click", function() {
  //     infoWindow.open(map, marker);
  //   });
}
