// Bring in router package
const router = require('express').Router();

// Bring in routes from controllers
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userControllers');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/userId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/users/userId/friends/friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);
module.exports = router;