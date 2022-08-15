// Bring in router package
const router = require('express').Router();

// Bring in routes from controllers
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
} = require('../../controllers/userControllers');

// /api/users
router.route('/').get(getUsers).post(createUser).put(updateUser);

// /api/users/userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

module.exports = router;