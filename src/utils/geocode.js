const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWlybGluZG11cmF0aSIsImEiOiJja2RpcGkxMmswNzV2MnRtcnp2Z2d1YnY5In0.NIEFhdqHrBf8A_rdnRxC4g&limit=1'
    request({ url, json: true}, (error, { body }) => { //destructuring response to extract body property
        if(error){
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Please try again with another location!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })   
}

module.exports = geocode
