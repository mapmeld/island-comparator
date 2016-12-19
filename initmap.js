var map, islandpoly;

function downloadIsland(isle) {
  fetch("islands/" + isle + ".json")
    .then(function(response) {
      return response.text();
    })
    .then(function(response) {        
      // convert island coordinate strings into [ [lng1, lat1], [lng2, lat2], ... ] array of arrays
      var island = response.split(" ");
      for(var pt=0;pt<island.length;pt++){
        island[pt] = new google.maps.LatLng( island[pt].split(",")[1] * 1.0, island[pt].split(",")[0] * 1.0 );
      }
    
      islandpoly = new google.maps.Polygon({
        paths: [ island ],
        strokeColor: "#0000FF",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map: map,
        geodesic: true,
        draggable: true
      });
    });
}

function init(){
  // the Google Map
  map = new google.maps.Map( document.getElementById("map"), {
    center: new google.maps.LatLng( 7.13167, 171.19713 ),
    zoom: 12,
    streetViewControl: false
  });
  
  // select an island to display
  document.getElementById("island").onchange = function() {
    if (islandpoly) {
      islandpoly.setMap(null);
    }
    downloadIsland(this.value);
  };
  
  downloadIsland('majuro');
}