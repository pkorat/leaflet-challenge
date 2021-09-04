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
        var customcolor = 'red'
        var description = response.features[i].properties

        if (location.coordinates[2] < 10.0) {
            customcolor = '#66CA6D'
        } else if (location.coordinates[2] < 30.0) {
            customcolor = '#BADA55'
        } else if (location.coordinates[2] < 50.0) {
            customcolor = '#FFB366'
        } else if (location.coordinates[2] < 70.0) {
            customcolor = '#FF8D1A'
        } else if (location.coordinates[2] < 90.0) {
            customcolor = '#CE7114'
        } else {
            customcolor = '#D74242'
        }

        if (location) {
            L.circleMarker([location.coordinates[1], location.coordinates[0]], {
                radius: description.mag * 8,
                color: customcolor,
                fillColor: customcolor,
                fillOpacity: 0.5
            })
            .bindPopup('<h3>' + description.place + '</h3><h3>Magnitude: ' + description.mag + '</h3>').addTo(myMap)
        }
    }
})