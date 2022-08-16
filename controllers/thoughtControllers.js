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
    },

    // Create a thought
    createThought(req, res) {
        Thought.create(req.body)
        .then((data) => res.json(data))
        .catch((err) => res.status(500).json(err));

        (error) => {
            if(!error) {
                Thought.find()
                .populate('postedBy')
                .populate('thoughts.postedBy')
                .exec(function(error, thoughts) {
                console.log(JSON.stringify(thoughts, null, "\t"))
                })
            }
        }
    },

    // Update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId}, 
            {thoughtText: req.body.thoughtText},
            {new: true})
            .then((data) => res.json(data))
            .catch((err) => res.status(500).json(err))
    },

    // Delete thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({_id: req.params.thoughtId})
        .then((data) => {
            if(!data) {
                res.status(404).json({ message: 'No thought with this id.' });
            } else {
                res.json(data);
            }
        })
    }
}