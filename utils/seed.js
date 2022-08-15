// Bring in mongoose connection and other files
const connection = require('../config/connection');
const { Thought, User } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany({});

    await User.collection.insertOne({
        username: "lernanyino",
        email: "lernantino@gmail.com"
    })
})


