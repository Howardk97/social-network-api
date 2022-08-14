// Packages/mongodb connection
const express = require('express');
const db = require('./config/connection');

// Routes, port, express, cwd
// const routes = require('./routes');
const PORT = process.env.PORT || 3001;
const app = express();

// Utilize express and routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(routes);

// Run server once database is loaded
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server is running on ${PORT} at localhost:${PORT}`)
    });
});



