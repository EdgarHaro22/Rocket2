// Import the express library
const express = require('express');

// Create an instance of express
const app = express();

// Define the port to listen on
const PORT = process.env.PORT || 8100;

// Set the view engine to EJS for templating
app.set('view engine', 'ejs');

// Setup a default fetch function using node-fetch for making API requests
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Define a route for the root URL
app.get('/', async (req, res) => {
    try {
        // Fetch data from the SpaceX API
        const response = await fetch('https://api.spacexdata.com/v5/launches');
        const launches = await response.json(); // Parse the JSON response

        // Render the 'index' view with fetched data
        res.render('index', { title: 'SpaceX Launches', message: 'Latest SpaceX Launches', launches: launches });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
