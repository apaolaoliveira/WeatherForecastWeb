class WeatherForecast {
  API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
  API_KEY = '&appid=9682f6d5e88afd693a36f7e7eaa41feb';
  QUERY_PARAMETERS = '&units=metric';

  cityName = document.getElementById('city-name');
  weather = document.getElementById('weather');
  search = document.getElementById('search');  
  alert = document.getElementById('alert');

  constructor() {
    this.SearchCity();
  }
  
  SearchCity(){
    this.search.addEventListener('submit', async (event) => {
      event.preventDefault();

      if(!this.cityName.value) return this.showAlert('Please enter a city name!');

      const request = `${this.API_URL}${encodeURI(this.cityName.value)}${this.API_KEY}${this.QUERY_PARAMETERS}`;
      const results = await fetch(request);
      const json = await results.json();
      console.log(json)

      if(json.cod != 200) return this.showAlert('This city could not be found.');

      this.showInfos({
        city: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        des: json.weather[0].description,

        tempMax: json.main.temp_max,
        tempMin: json.main.temp_min,
        humidity: json.main.humidity,
        windSpeed: json.wind.speed,
      });
    });
  }

  showAlert(message){
    this.weather.classList.remove('show');
    this.alert.classList.add('show');
    this.alert.innerHTML = message;
  }

  showInfos(json){
    this.showAlert('');
    this.alert.classList.remove('show');
    this.weather.classList.add('show');

    const elementMap = {
      'title': `${json.city}, ${json.country}`,
      'temp-description': json.des,
      'temp-img': `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`,
      'temp-value': this.formatTemperature(json.temp),
      'temp-max': this.formatTemperature(json.tempMax),
      'temp-min': this.formatTemperature(json.tempMin),
      'humidity': `${json.humidity}%`,
      'wind': `${json.windSpeed.toFixed(1)} km/h`
    };

    Object.entries(elementMap).forEach(([id, value]) => {
      const element = document.getElementById(id);
      id === "temp-img" ? element.setAttribute('src', value) : element.innerHTML = value;
    });
  }

  formatTemperature(temp) {
    return `${temp.toFixed(1).toString().replace('.', ',')} <sup>ºC</sup>`;
  }
}

window.addEventListener('DOMContentLoaded', () => new WeatherForecast());