const mongoose = require('../../common/database')();

const favoriteSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    property_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    }
}, { timestamps: { createdAt: 'added_at', updatedAt: false } });

const favoriteModel = mongoose.model("Favorite", favoriteSchema, "favorites");
module.exports = favoriteModel;
