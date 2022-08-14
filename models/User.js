// Bring in mongoose
const { Schema, model } = require('mongoose');

// Function that validates email
var valEmail = function() {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

// Model for User
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
        validate: [valEmail, 'Please enter a valid email address.'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address.']
       },

       thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
       ],

       friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'friend',
        },
       ],
    },
);

// Virtual for friend count
userSchema.virtual('friendCount').get(() => {
  return this.friends.length;
});

// Initialize User model
const User = model('user', userSchema);

// Export model
module.export = User;