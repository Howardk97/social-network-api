// Bring in models
const { User } = require('../models');

module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
            .then((userData) => res.json(userData))
            .catch((err) => {
                res.status(500).json(err);
                // console.log(err);
            }
            );
    },

    // Get a single user
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId})
        .select('-__v')
        .then((user) => {
            !user
                ? res.status(404).json({ message: 'No user with this id' })
                : res.json(user)
            }
        )
    },

    // Create a user
    createUser(req, res) {
        User.create(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
    },

    // updateUser(req, res) {
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            { username: req.body.username },
            {new: true}
            )
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },

    // Deletes a user by the id
    deleteUser(req, res) {
        User.findOneAndRemove({_id: req.params.userId})
            .then((user) => {
                if(!user) {
                    res.status(404).json({ message: 'No user with this id!'})
                } else {
                    res.json(user);
                }
            })
    },

    // Add a new friend to users friendlist
    addFriend(req, res) {     
        return User.findOneAndUpdate({_id: req.params.userId}, {$push: {friends: req.params.friendId}}, {new: true})
        .then((data) => {
            // console.log(dbUserData);
            if(!data) {
                res.json(data);
            }
        })
        .catch((err) => res.status(500).json(err));
    },

    // Delete friend from users friend list
    deleteFriend(req, res) {
        User.findOne({_id: req.params.userId})
        .then((data) => {
            console.log(data);
            // console.log(req.params.friendId)
            User.findOneAndRemove({_id: data._id}, {$pull: {friends: req.params.friendId}})
        })
        .then((data) => {
            if(!data) {
                res.status(404).json({message: "There are no such friends with this id"})
            }
        })
        .catch((err) => res.status(500).json(err))
    },
}