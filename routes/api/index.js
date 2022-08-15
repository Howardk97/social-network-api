// Bring in the router and routes
const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

// Use the routes,
// /api/thoughts
router.use('/thoughts', thoughtRoutes);

// /api/users
router.use('/users', userRoutes);

