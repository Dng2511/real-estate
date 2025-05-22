const PropertyModel = require("../../models/Property");
const PropertyTypeModel =  require("../../models/PropertyType");

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
    const properties = await PropertyModel.find({type_id: id}).skip(skip).limit(limit);

    res.status(200)
        .json({
            status: "success",
            filter: {
                page,
                limit,
            },
            data: properties,
            pages: await pagination(ProductModel, limit, page, { cat_id: id})
        })
}

exports.searchByType = async (req, res) => {
    const {id} = req.params
    await PropertyTypeModel.findById(id).then(async type => {
        if (!type) {
            return res.status(404).json({
                    status: "error",
                    message: "Type not found"
                });
        } else {
            const count = await PropertyModel.count({type_id: id})
            return res.status(200).json({
                status: "success",
                data: {...type  , count: count}
            })
        }
    })


}