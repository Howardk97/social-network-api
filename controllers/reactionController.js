const { Thought } = require('../models');

module.exports = {
    createReaction(req, res) {
        Thought.create(req.body)
        .then((data) => {
            Thought.findOneAndUpdate({_id: req.body.userId}, {$push: {reactions: data._id}}, {new: true})
        })
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                res.json(dbThoughtData)
            }
        })
        .catch((err) => res.status(500).json(err));
    }
}