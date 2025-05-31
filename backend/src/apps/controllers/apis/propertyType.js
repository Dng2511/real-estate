const PropertyModel = require("../../models/Property");
const PropertyTypeModel =  require("../../models/PropertyType");
const pagination = require("../../../libs/Pagination");

exports.getAll = async (req, res) => {

    const propertyTypes = await PropertyTypeModel.find();
    res.status(200).json({
        status: "success",
        data: propertyTypes
    })
}

exports.getPropertyByType = async (req, res) => {
    const {id} = req.params
    await PropertyTypeModel.findById(id).then(type => {
        if (!type) {
            return res.status(404).json({
                    status: "error",
                    message: "Type not found"
                });
        }
    })

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = limit*(page-1);
    const properties = await PropertyModel.find({type_id: id}).sort({ _id: -1 }).skip(skip).limit(limit);

    res.status(200)
        .json({
            status: "success",
            filter: {
                page,
                limit,
            },
            data: properties,
            pages: await pagination(PropertyModel, limit, page, { cat_id: id})
        })
}

exports.addPropertyType = async (req, res) => {
        const {name} = req.body;
        const propertyType = {
            name,
        }
        await new PropertyTypeModel(propertyType).save();
        res.status(201).json({
        status: "success",
        message: "Property type created successfully",
    });
}

exports.updatePropertyType = async (req, res) => {
    const{id} = req.params;
    try {
        const { id } = req.params;
        const type = await PropertyTypeModel.findById(id);
        type.name = req.body.name;
        await type.save();

        return res.status(200).json({
            status: "success",
            message: "Type updated successfully",
            data: type
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            error: error.message
        });
    }
}

