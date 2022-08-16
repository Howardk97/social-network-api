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
router.route('/').get(getThought)

// /api/thoughts/thoughtId
// router.route('/:thoughtId');

module.exports = router;