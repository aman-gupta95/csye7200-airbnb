

function loadMap(){
    var mymap = L.map('mapid').setView([-37.8136, 144.9631], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(mymap);

    L.marker([-37.8136, 144.9631]).addTo(mymap)
        .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

    L.circle([-37.8136, 144.9631], 10, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.2
    }).addTo(mymap).bindPopup("I am a circle.");

    var popup = L.popup();

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(mymap);
    }

    mymap.on('click', onMapClick);


    displayAddresses(L, mymap);
}

async function displayAddresses(L, mymap){
    const data = await getAllData();

    for (let elem in data) {
        const lat = data[elem].lat;
        const long = data[elem].long;

        L.circle([lat, long], 10, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.2
        }).addTo(mymap)
    }
}

loadMap();

async function getAllData() {

    var backendHost = "http://localhost:3700";
    var backendRoute = `${backendHost}/getAllAddresses`;
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000,
        'Content-Type': 'application/json',// 30 days
    };

    const data = await fetch(backendRoute)
        .then(data => {
            return data.json()
        })
        .then(res => res);

    return data;
}

