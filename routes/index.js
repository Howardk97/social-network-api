// Bring in router and routes from api folder
const router = require('express').Router();
const apiRoutes = require('./api');

// Use api routes, /api
router.use('/api', apiRoutes);

// Return wrong route if unable to access api route
router.use((req, res) => {
    return res.send('Wrong route!');
});

// Export the router
module.exports = router;