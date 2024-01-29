class WeatherForecast {
  API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
  API_KEY = '&appid=9682f6d5e88afd693a36f7e7eaa41feb';
  QUERY_PARAMETERS = '&units=metric&lang=pt_br';

  search = document.getElementById('search');  
  cityName = document.getElementById('city-name');
  weather = document.getElementById('weather');

  constructor() {
    this.SearchCity();
  }
  
  SearchCity(){
    this.search.addEventListener('submit', async (event) => {
      event.preventDefault();

      if(!this.cityName.value){
        this.weather.classList.remove('show');
        return this.showAlert('Você precisa digitar uma cidade!');
      }

      const request = `${this.API_URL}${encodeURI(this.cityName.value)}${this.API_KEY}${this.QUERY_PARAMETERS}`;
      const results = await fetch(request);
      const json = await results.json();

      if(json.cod != 200)
        return this.showAlert('Não foi possível localizar a cidade.');

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

  showInfos(json){
    this.showAlert('');
  }

  showAlert(message){
    document.getElementById('alert').innerHTML = message;
  }
}

window.addEventListener('DOMContentLoaded', () => new WeatherForecast());