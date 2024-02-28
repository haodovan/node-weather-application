//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require('request');

const forecast = (position, callback) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=f9b00079468645c8b4090453242702&q=${position}`;

  request({ url: url, json: true }, (error, { body:res }) => {
    if (error) {
      callback('Unable to connect to the internet', undefined);
    } else if (res.error) {
      callback(res.error.message, undefined);
    } else {
      callback(
        undefined,
        'Nhiet do hien tai: ' +
          res.current.temp_c +
          '*C ma cam giac nhu ' +
          res.current.feelslike_c +
          '*C'
      );
    }
  });
};

module.exports = forecast;
