// Selectors
const input = document.querySelector('.input')
const btn = document.querySelector('.btn')
const cityName = document.querySelector('.location__name')
const temperature = document.querySelector('.temperature__degree')
const weatherIcon = document.querySelector('.temperature-icon')
const weatherInfo = document.querySelector('.info__weather')
const sunrise = document.querySelector('.sunrise')
const sunset = document.querySelector('.sunset')

const api = {
  base: 'https://api.openweathermap.org/data/2.5/weather',
  key: '943e0f34e2deaf2018015929d9209930'
}


// Event Listener
input.addEventListener('keypress', weatherCity)
btn.addEventListener('click', getResult)

// Functions
function weatherCity(e) {
  if (e.keyCode === 13) {
    getResult()
  }
}

function getResult() {
  fetch(`${api.base}?q=${input.value}&units=metric&appid=${api.key}`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      cityName.innerText = `${data.name}, ${data.sys.country}`
      weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">`
      temperature.innerHTML = `${Math.round(data.main.temp)}&deg;c`
      weatherInfo.innerText = data.weather[0].main
      sunrise.innerText = `Sunrise: ${(new Date((data.sys.sunrise + data.timezone) * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0]}`
      sunset.innerText = `Sunset: ${(new Date((data.sys.sunset + data.timezone) * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0]}`
      console.log(data)
    })
}