const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=585fe9c36b0563d8091a7e0840ef32db&query='+ latitude + ',' + longitude + '&units=m'
    
    request({url, json: true}, (error, { body }) => {  // destructuring the response variable and extracting the body, as it is the only property we use in this program
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error) {
            callback('Unable to find location. Try again with another location!', undefined)
        } else {
           callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.' )
        }

    })

}

module.exports = forecast