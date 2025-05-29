
const FavoriteModel = require("../../models/favorite");
const UserModel = require("../../models/User");
const pagination = require("../../../libs/Pagination");

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
            data: favorites,
            pages: await pagination(FavoriteModel, limit, page, { user_id: id})
        })
}

exports.addFavorite = async (req, res) => {
    const body = req.body;

    const comment = {
        user_id: body.user_id,
        property: body.property_id
    };

    await new CommentModel(comment).save();

    res.status(200);
};