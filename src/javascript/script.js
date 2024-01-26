import { environment } from "../environments/environment.js";

class WeatherForecast {
  search = document.querySelector('.search');  

  constructor() {
    this.SearchCity();
  }
  
  SearchCity(){
    this.search.addEventListener('submit', async (event) => {
      event.preventDefault();

      const cityName = document.querySelector('#city-name').value;

      if(!cityName){
        document.querySelector('#weather').classList.remove('.show');
        return showAlert('Você precisa digitar uma cidade!');
      }

      const request = `${environment.API_URL}?q=${encodeURI(cityName)}
      ${environment.API_KEY}${environment.QUERY_PARAMETERS}`
    });
  }

  showAlert(message){
    document.querySelector('alert').innerHTML = message;
  }
}

window.addEventListener('DOMContentLoaded', () => new WeatherForecast());