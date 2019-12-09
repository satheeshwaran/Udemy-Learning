var request = require("request");
var req = require("https");
const url =
  "https://api.darksky.net/forecast/214fe4b179ca1f8857ca982ec53421b7/";
//12.9505737,80.2441692
const weatherUnits = "?units=si";
const geoCodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const mapBoxAccess =
  ".json?access_token=pk.eyJ1Ijoic2F0aGVlc2h3YXJhbiIsImEiOiJjajhvODJieDkwMGdzMzJwMWhycWN6OWxnIn0.PMcVhNnkIbDwHoqyckvTPA";

const forecast = (address, completion) => {
  geoCode(address, data => {
    if (data) {
      const weatherURL = `${url}${data.lat},${data.lon}${weatherUnits}`;
      console.log("weatherURL", weatherURL);
      const httpReq = req.request(weatherURL, response => {
        let responseData = "";
        response.on("data", data => {
          if (data) responseData += data.toString();
        });

        response.on("end", () => {
          let weatherBody = JSON.parse(responseData);
          completion({
            forecast: `${weatherBody.daily.data[0].summary} It is currently ${
              weatherBody.currently.temperature
            } °C and ${+weatherBody.currently.precipProbability *
              100}% chance of rain now.`,
            forecast_current: weatherBody.currently.summary,
            forecast_hourly: weatherBody.hourly.summary,
            forecast_daily: weatherBody.daily.summary,
            place_name: data.place_name
          });
          // console.log(
          //   `${weatherBody.daily.data[0].summary} It is currently ${
          //     weatherBody.currently.temperature
          //   } and ${+weatherBody.currently.precipProbability *
          //     100}% chance of rain now.`
          // );
          // console.log(`Forecast currently ${weatherBody.currently.summary}`);
          // console.log(`Forecast hourly ${weatherBody.hourly.summary}`);
          // console.log(`Forecast daily ${weatherBody.daily.summary}`);
        });
      });
      httpReq.end();
      // request({ url: weatherURL, json: true }, (error, response, weatherBody) => {
      //   console.log(
      //     `${weatherBody.daily.data[0].summary} It is currently ${
      //       weatherBody.currently.temperature
      //     } and ${+weatherBody.currently.precipProbability *
      //       100}% chance of rain now.`
      //   );
      //   console.log(`Forecast currently ${weatherBody.currently.summary}`);
      //   console.log(`Forecast hourly ${weatherBody.hourly.summary}`);
      //   console.log(`Forecast daily ${weatherBody.daily.summary}`);
      // });
    } else {
      completion({ error: "Try another place" });
    }
  });
};

const geoCode = (address, callback) => {
  let places = encodeURIComponent(address);
  const finalGeoCodeURL = `${geoCodeURL}${places}${mapBoxAccess}`;
  console.log(finalGeoCodeURL);
  request({ url: finalGeoCodeURL, json: true }, (error, response, body) => {
    if (body && body.features.length > 0) {
      // console.log("geocode response ", body);
      const { coordinates } = body.features[0].geometry;
      callback({
        lat: coordinates[1],
        lon: coordinates[0],
        place_name: body.features[0].place_name
      });
    } else {
      callback(error);
    }
  });
};

module.exports = {
  forecast: forecast
};
