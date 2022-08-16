// Bring in models
const { Thought } = require('../models');

module.exports = {
    // Get thoughts
    getThought(req, res) {
        Thought.find()
        .then((thoughtData) => res.json(thoughtData))
        .catch((err) => {
            res.status(500).json(err);
        })
    }
}