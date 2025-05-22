const mongoose = require('../../common/database')();

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: null
    },
    price: {
        type: Number,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    address: {
        street: String,
        ward: String,
        district: String,
        city: String
    },
    location: {
        lat: Number,
        lng: Number
    },
    status: {
        type: String,
        enum: ['available', 'sold', 'rented'],
        default: 'available'
    },
    type_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PropertyType',
        required: true
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    images: [{
        url: String,
        description: String
    }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const propertyModel = mongoose.model("Property", propertySchema, "properties");
module.exports = propertyModel;
