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
    },

    // get single thought
    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(404).json(err);
        })
    }
}