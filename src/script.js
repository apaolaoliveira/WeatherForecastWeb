class WeatherForecast {
  API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
  API_KEY = '&appid=9682f6d5e88afd693a36f7e7eaa41feb';
  QUERY_PARAMETERS = '&units=metrics&lang=pt_br';

  search = document.getElementById('search');  

  constructor() {
    this.SearchCity();
  }
  
  SearchCity(){
    this.search.addEventListener('submit', async (event) => {
      event.preventDefault();

      const cityName = document.getElementById('city-name').value;

      if(!cityName){
        document.getElementById('weather').classList.remove('show');
        return this.showAlert('Você precisa digitar uma cidade!');
      }

      const request = `${this.API_URL}${encodeURI(cityName)}${this.API_KEY}${this.QUERY_PARAMETERS}`;
      const results = await fetch(request);
      const json = await results.json();

      console.log(json)
    });
  }

  showAlert(message){
    document.getElementById('alert').innerHTML = message;
  }
}

window.addEventListener('DOMContentLoaded', () => new WeatherForecast());