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
    center: myLatLng
    //zoom: 10
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
        addMarker({ lat: lat, lng: lng }, parks[i].name, parks[i].address);
      }
    }
    map.fitBounds(bounds);
  });

  function addMarker(coords, name, address) {
    var marker = new google.maps.Marker({
      map: map,
      position: new google.maps.LatLng(coords.lat, coords.lng),
      title: name
    });
    console.log(coords.lat, coords.lng);
    bounds.extend(marker.position);
    var infoWindow = new google.maps.InfoWindow({
      content:
        "<h4>" +
        name +
        "</h4><h5>" +
        address +
        "</h5><h5><a href='page.html'>Pick this Park</a></h5>",
      maxWidth: 200
    });

    marker.addListener("click", function() {
      infoWindow.open(map, marker);
    });
  }
}
