/***************************************
    leaflet MAP
****************************************/
// Create map
const map = L.map('mapid').setView([-27.21866,-49.61291], 17); //setView([latitude, longitude], zoom)

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
    iconAnchor: [29, 68]
});

// create and add map marker | [latitude longitude]
let marker;

map.on('click', (event) => {
    const latitude = event.latlng.lat
    const longitude = event.latlng.lng
    document.querySelector('input[name=latitude]').value = latitude
    document.querySelector('input[name=longitude]').value = longitude

    // remove preview icon
    // if marker = true, this
    marker && map.removeLayer(marker)

    // add icon layer
    marker = L.marker([latitude,longitude], {icon})
    .addTo(map)
});

/***************************************
    IMAGES UPLOAD
****************************************/
// add a function to clean or hide the first .images-Upload
window.document.querySelector('.images-upload > span').addEventListener('click', (event) =>{
    // preview brother(Sibling)
    const input = event.currentTarget.previousElementSibling
    // if input value is empty disable it
    if (input.value == ''){
        input.setAttribute('disabled', '')
        input.parentElement.style.display = 'none'
    }else{
        input.value = ''
    }
})

// link a function with the .images-Upload-Container>button
window.document.querySelector('#images-upload-container > button').addEventListener('click', addImgField)

// add a new .images-Upload field
function addImgField(){
    // get the all .images-Upload
    const imgUploadArray = document.querySelectorAll('.images-upload')

    if (imgUploadArray[0].style.display === 'none'){
        imgUploadArray[0].style.display = ''
        imgUploadArray[0].children[0].removeAttribute('disabled')
        return
    }
    // create a clone of the last .images-Upload
    const imgDivClone = imgUploadArray[imgUploadArray.length-1].cloneNode(true)

    // get the input inside the .image-Upload
    const imgUploadInput = imgDivClone.firstElementChild

    validationAlertClear()
    // if the last .images-Upload > input on the DOCUMENT is empty NOW
    if (imgUploadInput.value == ''){
        validationAlertNew(imgUploadArray[0],
            'preencha url da imagem anterior primeiro')
        return // break the function
    }

    // clean the input inside imgUploadClone value
    imgUploadInput.value = ''

    // change the id from [image_0] to [image_imgUploadQuantity]
    imgUploadInput.id = imgUploadInput.id.replace(/[0-9]+/, imgUploadArray.length)

    // insert a .images-Upload clone before the button
    document.querySelector('#images-upload-container').insertBefore(
        imgDivClone,
        document.querySelector('#images-upload-container > button')
    )

    // link a function to the span with the red X
    imgDivClone.children[1].addEventListener('click', removeImgField)
}
// remove a .images-upload field
function removeImgField(event){
    event.currentTarget.parentElement.remove()
}

/***************************************
    Form validation
****************************************/
// form validation
function validate(event){
    validationAlertClear()

    // get all input and textarea
    document.querySelectorAll('input, textarea').forEach((element)=>{
        if(element.value == '' && !element.hasAttribute('disabled')){
            // prevent submit the form
            event.preventDefault()

            // get input label and label inner text
            let parent = document.querySelector(`label[for="${element.id}"]`)
            let txtAlert = 'preencha ' + (parent ? parent.innerText : element.name)

            // if validation refers to map latitude
            if (element.name == 'images') {
                parent = document.querySelector('label[for="image_0"]')
                txtAlert = 'preencha fotos'
            } else if (element.name == 'latitude' ){
                parent = document.querySelector('.map-container')
                txtAlert = 'marque o local no mapa'
            } else if (element.name == 'longitude'){
                return
            }
            validationAlertNew(parent, txtAlert.toLowerCase())
        }
    })
    // radio input validation
    const open_on_weekends = document.getElementsByName('open_on_weekends')
    // if both input isn't checked
    if((open_on_weekends[0].checked == false) && (open_on_weekends[1].checked == false)){
        event.preventDefault()
        validationAlertNew(document.querySelector('.weekends-choose'),
                           'marque se atende aos finais de semana')
    }
}
function validationAlertNew(element, text) {
    element.insertAdjacentHTML(
        'beforebegin',
        `<p class="validation-alert">Por favor, ${text}</p>`
    )
    // scroll to 1st alert
    document.querySelector('.validation-alert').scrollIntoView()
}
function validationAlertClear() {
    document.querySelectorAll('.validation-alert').forEach((p) =>{
        p.remove()
    })
}
/***************************************
    Happy logo action
****************************************/
window.document.querySelector('#logo-header').addEventListener('click', () => {
    window.document.location.href = '/orphanage-map'
})