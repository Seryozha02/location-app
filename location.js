locationApp = document.querySelector(".location")
let clickBtn = document.querySelector(".location button")

let apiKey = "12f98be13ea641f7902711d446097644";


clickBtn.addEventListener("click", () => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }else {
        clickBtn.classList.remove("error")
        clickBtn.innerText = "Problem with your browser"
    }
})


function onSuccess(position) {
    locationApp.classList.add("active")
    clickBtn.classList.remove("error")
    clickBtn.innerText = "Click for getting device location"

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`)
    .then(res => res.json()).then(response => {

        const country = response.results[0].components.country
        const city = response.results[0].components.city
        const cityDistrict = response.results[0].components.city_district
        const street = response.results[0].components.road
        const houseNumber = response.results[0].components.house_number

        locationApp.querySelector(".country").innerText = country
        locationApp.querySelector(".city").innerText = city
        locationApp.querySelector(".city-district").innerText = cityDistrict
        locationApp.querySelector(".street").innerText = street       
        locationApp.querySelector(".house-number").innerText = houseNumber       

    })
}


function onError(error) {
    clickBtn.classList.add("error")
    clickBtn.innerText = "Please allow your location and click again"
}