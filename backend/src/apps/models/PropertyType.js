const mongoose = require('../../common/database')();

const propertyTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const propertyTypeModel = mongoose.model("PropertyType", propertyTypeSchema, "property_types");
module.exports = propertyTypeModel;
