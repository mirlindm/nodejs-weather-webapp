// Client Side JavaScript

//console.log('Client side JavaScript file is loaded!')

// Fetch API - Browser based API
// fetch() allows us to fetch data from the internet and do something with it
// Example
fetch('http://puzzle.mead.io/puzzle').then( (response) => {
    response.json().then( (data) => {
        console.log(data)
    })
})


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1') // matches the first paragraph on the html page!
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value

    messageOne.textContent = 'Weather Forecast is Loading...'
    messageTwo.textContent = ''

    // Fetch weather for Boston! Challenge
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                console.log(data)
                //console.log(data.forecast)
            }
        })
    })
})

