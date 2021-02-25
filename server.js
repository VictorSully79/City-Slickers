// ============== Packages ==============================

const express = require('express');
const cors = require('cors'); // just kinda works and we need it
const superAgent = require('superagent');
require('dotenv').config(); // read the `.env` file's saved env variables AFTER reading the terminal's real env's variables


// ============== App ===================================

const app = express(); // express() will return a fully ready to run server object
const PORT = process.env.PORT || 3009; // process.env is boilerplace the variable name is potato

app.use(cors()); // enables local processes to talk to the server // Cross Origin Resource Sharing
app.listen(PORT, console.log (`server is on ${PORT}`))
const GEO_API_KEY = process.env.GEO_API_KEY;

//-------------------Routes------------------------------------------
const locationData = require('./data/location.json');
const weatherData = require('./data/weather.json');       
//==========================================================================
app.get('/location', getLocationData);


function getLocationData (req, resp) { 
console.log('this is get location route', req);
  //GET https://us1.locationiq.com/v1/search.php?key=YOUR_ACCESS_TOKEN&q=SEARCH_STRING&format=json
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
    console.log('this is resultFromSuperAgent: ', resultFromSuperAgent.body );
  }

  )

  
  const firstLocation = new Location(locationData, req.query.city);
  resp.send(firstLocation);
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


function getWeather(req, resp){
  const formattedWeatherData = weatherData.data.map(singleDayData => {
     return new WeatherData(singleDayData);
     
  })
  
   console.log(formattedWeatherData);
   resp.send(formattedWeatherData);
}

  
function WeatherData(localWeather){
  this.forecast = localWeather.weather.description;
  this.time = localWeather.valid_date; 
}

  

  


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