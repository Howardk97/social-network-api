const { Schema, model } = require('mongoose');

var valEmail = function() {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new Schema(
    {
       username: {
        type: String,
        required: true,
        unique: true,
        trim: true
       },

       email: {
        type: String,
        required: true,
        unique: true,
        validate: [validateEmail, 'Please enter a valid email address.'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address.']
       },

       _id: [
            {
                type: Schema.Types.ObjectId,
                ref: Thought,
            },
       ],
    },
)