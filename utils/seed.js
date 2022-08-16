// Bring in mongoose connection and other files
const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany({});

    await User.collection.insertOne({
        username: "lernanyino",
        email: "lernantino@gmail.com"
    });

    await Thought.deleteMany({});
    
    await Thought.collection.insertOne({
        thoughtText: "Here's a cool thought",
        username: "lerantino",
        userId: "62fad0b3fec8674e004ba75c"
    })
})


