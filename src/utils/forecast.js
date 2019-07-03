const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/e1e4e540d3c1c2d74fbd72a6cf37c305/${latitude},${longitude}?units=si`;

    request({ url, json: true }, (error, response) => {
        const { currently, daily } = response.body;
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (response.body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(
                undefined,
                `It is currently ${
                    currently.temperature
                } degrees out. There is a ${
                    currently.precipProbability
                } % chance of rain. ${daily.data[0].summary}

                The humidity is ${(daily.data[0].humidity * 100).toFixed(
                    1
                )}%. The wind speed is ${daily.data[0].windSpeed} m/s`
            );
        }
    });
};

module.exports = forecast;
