// Bring in router package
const router = require('express').Router();

// Bring in routes from controllers
const {
    getThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thoughtControllers');

// /api/thoughts
router.route('/').get(getThought).post(createThought)

// /api/thoughts/thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// Export Routers
module.exports = router;