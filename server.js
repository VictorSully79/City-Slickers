// ============== Packages ==============================

const express = require('express');
// const cors = require('cors'); // just kinda works and we need it
const superAgent = require('superagent');
require('dotenv').config(); // read the `.env` file's saved env variables AFTER reading the terminal's real env's variables
const pg = require('pg');


// ============== App ===================================

const app = express(); // express() will return a fully ready to run server object
const PORT = process.env.PORT || 3009; // process.env is boilerplace the variable name is potato
const DATABASE_URL = process.env.DATABASE_URL
const client = new pg.Client(DATABASE_URL);
client.on('error', error => console.log(error));
// app.use(cors()); // enables local processes to talk to the server // Cross Origin Resource Sharing

const GEO_API_KEY = process.env.GEO_API_KEY;

//-------------------Routes------------------------------------------
const locationData = require('./data/location.json');
const weatherData = require('./data/weather.json');       
//==========================================================================
app.get('/location', getLocationData);


function getLocationData (req, resp) { 
console.log('this is get location route', req);
  
var locationURL = 'https://us1.locationiq.com/v1/search.php';
var locationQueryParam = {
  key: GEO_API_KEY,
  q: req.query.city,
  format: 'json',
  limit: 1
};
  superAgent.get(locationURL)
    .query(locationQueryParam)
    .then(resultFromSuperAgent => {
      // console.log('this is resultFromSuperAgent: ', resultFromSuperAgent.body);
      const firstLocation = new Location(resultFromSuperAgent.body, req.query.city);
      resp.send(firstLocation);
    })
    .catch(error => {
      console.log(error)
    })
}

function Location(fileData, cityName) {

  this.city = Object.entries(cityName)[0][1];
  this.search_query = cityName;
  this.formatted_query = fileData[0].display_name;
  this.latitude = fileData[0].lat;
  this.longitude = fileData[0].lon;

}



//======================Weather==================
app.get('/weather', getWeather);


function getWeather(request, response){
  const weatherKey = process.env.WEATHER_API_KEY;
  weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${request.query.latitude}&lon=${request.query.longitude}&key=${weatherKey}&day=8`;
  superAgent.get(weatherURL)
  .then (results => {
    const formattedWeatherData = results.body.data.map(singleDayData => {
      return new WeatherData(singleDayData);
      })
      response.send(formattedWeatherData);

  })
  
  
//    console.log(formattedWeatherData);
//    resp.send(formattedWeatherData);
}

  
function WeatherData(localWeather){
  this.forecast = localWeather.weather.description;
  this.time = localWeather.valid_date; 
}
app.get('/parks', getParks);
function getParks(request, response){
  const parksKey = process.env.PARKS_API_KEY;
  parksURL = `https://developer.nps.gov/api/v1/parks?q=${request.query.search_query}&api_key=${parksKey}`;
  superAgent.get(parksURL)
  .then (results => {
    const parkList = new getParksList(results.body.data);
    response.send(parkList);
    
  }) .catch(error => 
    console.log(error));
}

function Parks(name, address, fee, description, url){
  this.name = name;
  this.address = address;
  this.fee = fee;
  this.description = description;
  this.url = url;

}

function getParksList (parkData){
  return parkData.map(data => {
    return new Parks (data.fullName, data.addresses[0].line1,
      data.entranceFees[0].cost, data.description, data.url );
  })
}

app.listen(PORT, console.log (`server is on ${PORT}`))

  


//================Weather Data Retrieval==============


  // {
  //   "forecast": "Partly cloudy until afternoon.",
  //   "time": "Mon Jan 01 2001"
  // },
  // {
  //   "forecast": "Mostly cloudy in the morning.",
  //   "time": "Tue Jan 02 2001"
  // },
// app.get('/restaurants', handleGetRestaurants);

// function handleGetRestaurants(req, resp){
//   console.log('this is resp', resp);
// const restaurantJSON = require('./data/restaruants.json');
// const output = [];
// for (let i = 0; i < nearby_restaurants.length; i++){
//   output.push(new restaurantJSON(restaurantJSON.nearby_restaurants[i].restaurant));
// }
//   resp.send(output);
// }