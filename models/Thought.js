// Bring in mongoose
const { Schema, model } = require('mongoose');

// Create model for Reaction
const reactionSchema = new Schema({
    reactionId: {
        type: ObjectId,
        default: Schema.Types.ObjectId
    },

    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },

    username: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now(),
        get: (date) => {
            if(date) return date.toISOString().split(" ") [0];
        },
        timestamps: true,
    },
});

// Model for Thought
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },

        createdAt: {
            type: Date,
            default: Date.now(),
            get: (date) => {
                if(date) return date.toISOString().split(" ") [0];
            },
            timestamps: true,
        },

        username: {
            type: String,
            required: true
        },

        reactions: [reactionSchema]
    }
);


// Virtual for reaction count
thoughtSchema.virtual('reactionCount').get(() => {
    return this.reactions.length;
});

// Initialize thought model
const Thought = model('thought', thoughtSchema);

// Thought.create({})

// Export Thought model
module.exports = Thought;