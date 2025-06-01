const UserModel = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pagination = require("../../../libs/Pagination");

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
    const { name, email, password, phone } = req.body;
    const role = req.params.role;
    if (role != "customer" && role != "owner") {
        return res.status(401).json({ status: "error", message: "Invalid role" });
    }

    const existing = await UserModel.findOne({ email, role });
    if (existing) {
        return res.status(400).json({ status: "error", message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new UserModel({ name, email, password: hashed, phone, role });
    await user.save();

    res.status(201).json({
        status: "success",
        message: "User registered",
        data: { id: user._id, name: user.name, email: user.email },
    });
};

// [POST] /api/users/login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
        return res.status(401).json({ status: "error", message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ status: "error", message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
        status: "success",
        message: "Login successful",
        data: {
            token,
            user: { id: user._id, name: user.name, email: user.email }
        }
    });
};

// [GET] /api/users?page=1&limit=10
exports.index = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = limit * (page - 1);

    const users = await UserModel.find()
        .select("-password") // không trả về mật khẩu
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit);

    res.status(200).json({
        status: "success",
        data: { docs: users },
        pages: await pagination(UserModel, limit, page),
    });
};
