const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Hao Do',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Hao Do',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Need help?',
    name: 'Hao Do',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address',
    });
  }

  forecast(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    }
    res.send({
      forecast: data,
      address: req.query.address,
    });
  });


});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Hao Do',
    errorMessage: 'Help article not found.',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Hao Do',
    errorMessage: 'Page not found.',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
