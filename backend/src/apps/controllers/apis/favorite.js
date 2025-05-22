
const FavoriteModel = require("../../models/favorite");
const UserModel = require("../../models/User")

exports.getByUser = async () => {
    const {id} = req.params
    await UserModel.findById(id).then(user => {
        if (!user || user.role != "customer") {
            return res.status(404).json({
                    status: "error",
                    message: "Customer not found"
                });
        }
    })

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = limit*(page-1);

    const favorites = await FavoriteModel.find({user_id: id})

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