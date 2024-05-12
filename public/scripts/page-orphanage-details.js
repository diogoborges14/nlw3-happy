/***************************************
    leaflet MAP
****************************************/
// get data from document
const latitude = document.querySelector('input[name=latitude]').value
const longitude = document.querySelector('input[name=longitude]').value

// Map options
const options = {
    dragging: false,
    touchZoom: false,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    zoomControl: false
}

// Create map
const map = L.map('mapid', options).setView([latitude,longitude], 17); //setView([latitude, longitude], zoom)

// Create and add OpenStreetMap tileLayer
L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap&nbsp;</a>'
    }
).addTo(map);

// Create icon for map marker
const icon = L.icon({
    iconUrl: '/img/map-marker.svg',
    iconSize: [58, 68],
    iconAnchor: [29, 68]
});

// Create and add map marker | [latitude longitude]
L.marker([latitude, longitude], {icon})
.addTo(map)

// Select main showing image
function selectImage(event){
    const buttonElement = event.currentTarget

    // Remover todas as class .active
    document.querySelectorAll('.images button').forEach((button) =>{
        button.classList.remove('active')
    })

    // Selecionar a imagem clicada
    const imgTarget = buttonElement.firstElementChild
    const imgContainer = document.querySelector('.orphanage-details > img')

    // Atualizar o container de imagem
    imgContainer.src = imgTarget.src

    // Adicionar class .active para o botão
    buttonElement.className += 'active'
}

// Happy logo action
window.document.querySelector('#logo-header').addEventListener('click', () => {
    window.document.location.href = '/orphanage-map'
})
