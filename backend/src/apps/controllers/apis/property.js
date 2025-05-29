const PropertyModel = require("../../models/Property");
const CommentModel = require("../../models/Comment");
const pagination = require("../../../libs/Pagination");

exports.getAll  = async (req, res) => {
    const query = {};
    query.status = req.query.status || 'available'; // available | sold | rented
    if (req.query.city) query['address.city'] = req.query.city;
    if (req.query.type_id) query.type_id = req.query.type_id;
    if (req.query.name) query.$text = { $search: req.query.name };

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = limit * (page - 1);

    const properties = await PropertyModel.find(query)
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit);

    res.status(200).json({
        status: "success",
        filter: {
            status: query.status,
            city: req.query.city || null,
            type_id: req.query.type_id || null,
            page,
            limit,
        },
        data: properties,
        pages: await pagination(PropertyModel, limit, page, query),
    });
};

exports.addProperty = async(req, res) =>{
    try {
        const { title, description, price, area, address, status, type_id} = req.body;

        // Nếu có file ảnh
        const images = (req.files || []).map(file => ({
            url: file.filename,   // chỉ lưu tên ảnh
            description: ""       // có thể thêm input mô tả nếu cần
        }));

        const newProperty = new PropertyModel({
            title,
            description,
            price,
            area,
            address: JSON.parse(address), // vì gửi từ FormData nên cần parse
            status,
            type_id,
            images
        });

        await newProperty.save();
        res.status(201).json(newProperty);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi tạo bất động sản" });
    }
    
}

exports.findById = async (req, res) => {
    const id = req.params.id;
    const property = await PropertyModel.findById(id);
    if (!property) {
        return res.status(404).json({
            status: "error",
            message: "Property not found",
        });
    }
    res.status(200).json({
        status: "success",
        data: property,
    });
};

exports.comment = async (req, res) => {
    const id = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = limit * (page - 1);

    const comments = await CommentModel.find({ property_id: id })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit);

    res.status(200).json({
        status: "success",
        filter: {
            page,
            limit,
        },
        data: {
            docs: comments,
        },
        pages: await pagination(CommentModel, limit, page, { property_id: id }),
    });
};

exports.storeComment = async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    const comment = {
        name: body.name,
        email: body.email,
        body: body.body,
        property_id: id,
    };

    await new CommentModel(comment).save();

    res.status(201).json({
        status: "success",
        message: "Comment created successfully",
    });
};
