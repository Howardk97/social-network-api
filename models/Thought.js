// Bring in mongoose
const { Schema, model } = require('mongoose');

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

        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'reactionSchema'
            }
        ]
    }
);

// Virtual for reaction count
thoughtSchema.virtual('reactionCount').get(() => {
    return this.reactions.length;
});

// Initialize thought model
const Thought = model('thought', thoughtSchema);

// Export Thought model
module.exports = Thought;