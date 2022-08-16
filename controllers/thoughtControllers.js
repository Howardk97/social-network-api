// Bring in models
const { User, Thought } = require('../models');

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
        .then((data) => {
            console.log(data)
            console.log(req.body)
            return User.findOneAndUpdate({_id: req.body.userId}, {$push: {thoughts: data._id}}, {new: true})
        })
        .then((dbUserData) => {
            if(!dbUserData) {
                res.json(dbUserData)
            }
        })
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
    },

    // Create reaction
    createReaction(req, res) {
        Thought.create(req.body)
        .then((data) => {
            console.log(data)
            Thought.findOneAndUpdate({_id: req.body.userId}, {$push: {reactions: data._id}}, {new: true})
        })
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                res.json(dbThoughtData)
            }
        })
        .catch((err) => res.status(500).json(err));
    },

    deleteReaction(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
        .then((data) => {
            console.log(data);
            // console.log(req.params.friendId)
            User.findOneAndRemove({_id: data._id}, {$pull: {reactions: req.params.reactionId}})
        })
        .then((data) => {
            if(!data) {
                res.status(404).json({message: "There are no such friends with this id"})
            }
        })
        .catch((err) => res.status(500).json(err))
    },
}