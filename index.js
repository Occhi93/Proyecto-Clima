window.addEventListener('Load', geoLocation);

let longitud;
let latitud;
let locationTimeZone=document.querySelector('location-timezone')
let locationTemperature = document.querySelector('location-temperature')

function geoLocation(){
    if (navigator.geolocation){
        console.log("Si hay localizacion")
        navigator.geolocation.getCurrentPosition(
            (position) => {
                callApi(position)
            }
        )
    }
    else{
        return alert("No se ha podido acceder a la geolocalizacion")
    }
}

async function callApi(position){
    longitud = position.coords.longitude;  
    latitud = position.coords.latitude;

    //PROXY
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    // dentro de estas comillas que van al reves significan que se compone un String, es decodeURI, me permite poner variables adentro
    const apiURL =`${proxy}https://api.darksky.net/forecast/44732fd141ded7d3f03140ae4e9db3d1/${latitud},${longitud}`
    
    // fetch busca una URL y me trae los datos de la misma
    let apiCall = await fetch(apiURL);

    // convierto apicall en un objeto JSON
    let dataJSON = await apiCall.json()

    console.log("dataJSON", dataJSON);
    setWeatherData(dataJSON);
}

function setWeatherData(data){
    locationTimeZone.textContent = data.timezone;
    locationTemperature = data.currently.temperature;
}