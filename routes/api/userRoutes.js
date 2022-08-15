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
router.route('/')
.get(getUsers)
.get(getSingleUser)
.post(createUser)
.put(updateUser)
.delete(deleteUser)