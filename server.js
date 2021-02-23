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
/* const locationData = require('./data/location.js');
const weatherData = require('/weather/weather.js');
const { response } = require('express');
 */
//const getLocationData = ('/location.json');

//==========================================================================

app.get('/data/location.json', getLocationData)
 
function getLocationData () { 
  let firstLocation = new Location (getLocationData, request.query);
  response.send(firstLocation);
}

function Location(getLocationData, cityName) {
  let city = Object.entries(cityName)[0][1];
  this.search_query = city;
  this.formatted_query = getLocationData[0].display_name;
  this.lat = dataFromTheFile[0].lat;
  this.lon = dataFromTheFile[0].lon;

}