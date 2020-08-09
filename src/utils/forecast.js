const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=585fe9c36b0563d8091a7e0840ef32db&query='+ latitude + ',' + longitude + '&units=m'
    
    request({url, json: true}, (error, { body }) => {  // destructuring the response variable and extracting the body, as it is the only property we use in this program
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error) {
            callback('Unable to find location. Try again with another location!', undefined)
        } else {
            //console.log(body.current) - to check what information can we use in our callback function body
           callback(undefined, 'It looks ' + body.current.weather_descriptions[0] + ' outside. It is currently ' + 
                    body.current.temperature + ' degrees out, but it feels like ' + 
                    body.current.feelslike + ' degrees. The humidity is ' + body.current.humidity + '%. There is ' +
                    body.current.precip + '% of raining today. Thank you for using this service!')
        }

    })

}

module.exports = forecast