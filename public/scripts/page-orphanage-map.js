/***************************************
    leaflet MAP
****************************************/
// Create map
const map = L.map('mapid').setView([-27.21866,-49.61291], 13); //setView([latitude, longitude], zoom: 17)

// create and add OpenStreetMap tileLayer
L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }
).addTo(map);

// create icon for map marker
const icon = L.icon({
    iconUrl: '/img/map-marker.svg',
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
});

function addMaker({id, name, latitude, longitude}){
    // create popup overlay
    const popup = L.popup({
        closeButton: false,
        className: 'map-popup',
        minWidth: 240,
        minHeight: 240
    }).setContent(`${name}<a href="/orphanage-details?id=${id}"><img src="/img/arrow-white.svg"></a>`)

    // create and add map marker | [latitude longitude]
    L.marker([latitude, longitude], {icon})
    .addTo(map)
    .bindPopup(popup)
}
const orphanage_db_span = document.querySelectorAll('#orphanage_db span')
orphanage_db_span.forEach((span) =>{
    const orphanage = {
        id: span.dataset.id,
        name: span.dataset.name,
        latitude: span.dataset.latitude,
        longitude: span.dataset.longitude,
    }
    addMaker(orphanage)
})
/***************************************
    Happy logo action
****************************************/
window.document.querySelector('#logo-header').addEventListener('click', () => {
    window.document.location.href = '/'
})