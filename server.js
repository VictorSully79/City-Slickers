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

//==========================================================================

app.get('./data/location.json', getLocationData);
app.get('/', homefunction);
function homefunction (req, resp){
  console.log('inside homefunction')
} 
function getLocationData (req, resp) { 
  let firstLocation = new Location(locationData, req.query);
  resp.send(firstLocation);
}

function Location(fileData, cityName) {
  let city = Object.entries(cityName)[0][1];
  this.search_query = city;
  this.formatted_query = fileData[0].display_name;
  this.lat = fileData[0].lat;
  this.lon = fileData[0].lon;

}
