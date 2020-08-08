const path = require('path')
const express = require('express')
const hbs = require('hbs')
//const { response } = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// console.log(__dirname)
// console.log(path.join(__dirname, '../public/index.html'))

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//app.set('views', path.join(__dirname, 'views'));

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// API for root route. We can remove this, because index.html automatically means that it will render for the root path, because
// the word index has a special meaning in Node.js
// app.get('', (req, res) => {
//     res.send('<h1> Weather </h1>')
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mirlind Murati'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Mirlind Murati'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Here to help',
        name: 'Mirlind Murati',
        message: 'This is some helpful text'
    })
})

// API for help route
// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Mirlind'
//     }, {
//         name: 'Safa'
//     }])
// })

// API for about route
// app.get('/about', (req, res) => {
//     res.send('<h1> This is the About Page!</h1>')
// })

// API for weather route
app.get('/weather', (req, res) => {
    if(!req.query.address){   // the parameter address comes from the query string in the browser: localhost:3000/weather?address=tartu
        return res.send({
            error: 'You must provide an address!'
        })
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error })  //shorthand of object property, since they have same name
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })
})

app.get('/products', (req, res) => {
    // if statement when there is no search term
    if(!req.query.search) {
        return res.send({                                    // return is a common pattern in express, meaning that the code execution will stop there if the if is satisfied
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})



app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Mirlind Murati'
    })
})

// Setting up a 404 Page using * as a wildcard to match any other route that we have not set up before
// It needs to be put after setting all other routes
app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Mirlind'
    })
})

// Make the server listen on port 3000
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})