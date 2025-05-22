const mongoose = require('../../common/database')();

const commentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    property_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

const commentModel = mongoose.model("Comment", commentSchema, "comments");
module.exports = commentModel;
