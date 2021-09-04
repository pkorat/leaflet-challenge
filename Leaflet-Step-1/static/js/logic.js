var myMap = L.map("map", {
    center: [39.8333, -98.5833],
    zoom: 5
});
  
// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'

d3.json(url).then(function(response) {

    console.log(response.features)

    for (var i=0; i < response.features.length; i++) {

        var location = response.features[i].geometry
        var description = response.features[i].properties

        if (location) {
            L.marker([location.coordinates[1], location.coordinates[0]])
            .bindPopup('<h3>' + description.place + '</h3><h3>Magnitude: ' + description.mag + '</h3>').addTo(myMap)
        }
    }
})