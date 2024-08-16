const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;


const apiKey = '41c3a8e7b8aed86ed961807b24a8dbb3'; 
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/weather', async (req, res) => {
    const city = req.query.city || 'Manado'; 
    try {
        const response = await axios.get(weatherUrl, {
            params: {
                q: city,
                appid: apiKey,
                units: 'metric' 
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching weather data from OpenWeather');
    }
});


app.post('/api/data', (req, res) => {
    const data = req.body;
    console.log(data);
    res.status(201).send('Data received');
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
