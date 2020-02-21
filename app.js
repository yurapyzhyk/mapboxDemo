L.mapbox.accessToken = 'pk.eyJ1IjoieXVyYXB5emh5ayIsImEiOiJZV2xBbGs4In0.Nk6SQ7RDmH0x8WRxi-xIVw';

const map = L.mapbox.map('map')
    .setView([51.496648, -0.101409], 13)
    .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));

const featureLayer = L.mapbox.featureLayer()
    .loadURL('https://ons-inspire.esriuk.com/arcgis/rest/services/Administrative_Boundaries/WGS84_UK_Wards_December_2017_Boundaries/MapServer/1/query?outFields=*&f=geojson&where=lat%20%3E%3D%2051.473525%20AND%20lat%20%3C%3D%2051.527382%20AND%20long%20%3E%3D%20-0.180416%20AND%20long%20%3C%3D%20-0.016909')
    .addTo(map)
    .on('ready', initFeatures);

const slider = document.getElementById("myRange");

const hues = [
    '#eff3ff',
    '#bdd7e7',
    '#6baed6',
    '#3182bd',
    '#08519c'];

let markers = [
    [51.49, -0.12],
    [51.48, -0.101409],
    [51.47, -0.11],
    [51.496626, -0.10123],
    [51.4948, -0.1015],
];

markers.forEach((value) => {
    L.marker(value, {
        icon: L.mapbox.marker.icon({
            'marker-color': '#555555'
        })})
        .bindPopup('Some data').addTo(map);
});

slider.oninput = () => {styleFeatures()};

function applyStyle(layer) {
    let index = slider.value * layer._leaflet_id % 5;
    layer.setStyle({
        fillColor: hues[index],
        fillOpacity: 0.7
    })
}

function styleFeatures() {
    featureLayer.getLayers().forEach((value => {
        applyStyle(value);
    }))
}

function initFeatures() {
    featureLayer.getLayers().forEach((value => {
        value.bindPopup('Yard data');
        applyStyle(value);
    }))
}

asd