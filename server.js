// ============== Packages ==============================

const express = require('express');
const cors = require('cors'); // just kinda works and we need it

require('dotenv').config(); // read the `.env` file's saved env variables AFTER reading the terminal's real env's variables


// ============== App ===================================

const app = express(); // express() will return a fully ready to run server object
app.use(cors()); // enables local processes to talk to the server // Cross Origin Resource Sharing

const PORT = process.env.PORT || 3009; // process.env is boilerplace the variable name is potato

app.listen(PORT, console.log("server is on"));


//-------------------Routes------------------------------------------
//const getLocationData = require('/data/location.json');
//const weatherData = require('/weather/weather.js');
//const express = require('express');

//const locationData = require('.data/location.json');
const locationData = require('./data/location.json');

//==========================================================================

app.get('/location', getLocationData);

 
function getLocationData (req, resp) { 
  
  const firstLocation = new Location(locationData, req.query.city);
  resp.send(firstLocation);
}

function Location(fileData, cityName) {
  //let  = Object.entries(cityName)[0][1];
  this.city = Object.entries(cityName)[0][1];
  this.search_query = cityName;
  this.formatted_query = fileData[0].display_name;
  this.latitude = fileData[0].lat;
  this.longitude = fileData[0].lon;

}
//======================Weather==================

function handleGetWeather(req, resp){
  const output = [];

  const dataFromTheFile = require('./data/weather.json');
  for(let i = 0; i < dataFromTheFile.data.length; i++) {
    output.push(new WebAuthnAssertion(dataFromTheFile.data[i]));
  }
  resp.send(output);
}

//================Weather Data Retrieval==============

function Weather(data){
  this.forecast = data.weather.description;
  this.time = data.valid_date;
}
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