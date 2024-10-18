import express from 'express';
import axios from 'axios';

const app = express();
const port = process.env.PORT || 3000;
const apikey = import.meta.env.VITE_WEATHER_API_KEY;
app.get('/', (req, res) => {
    res.send('Hello from Node.js!');
});

app.get('/weather', async (req, res) => {
    let url;
    
    if (req.query.city) {
      const city = req.query.city;
      url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    } else if (req.query.latitude && req.query.longitude) {
      const { latitude, longitude } = req.query;
      url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
    } else {
      return res.status(400).send('Error. No coordinates found');
    }
  
    try {
      const response = await axios.get(url);
      res.json(response.data);
    } catch (error) {
      res.status(500).send('Error getting the weather');
    }
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});