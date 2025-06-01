const AppointmentModel = require('../../models/Appointment');
const pagination = require("../../../libs/Pagination");

exports.getAppointment = async (req, res) => {
    try {
        const { user_id, property_id } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = limit * (page - 1);

        // Tạo điều kiện lọc
        let filter = {};
        if (user_id) filter.user_id = user_id;
        if (property_id) filter.property_id = property_id;

        // Tìm kiếm theo filter và sắp xếp theo ngày giảm dần
        const appointments = await AppointmentModel.find(filter)
            .populate('user_id', 'name email phone') // chỉ lấy trường name và email
            .populate('property_id', 'title address') // chỉ lấy trường name và address
            .sort({ scheduled_time: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            status: "success",
            data: appointments,
            pages: await pagination(AppointmentModel, limit, page, filter),
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};

// controllers/appointmentController.js
// controllers/appointmentController.js
exports.updateAppointmentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const appointment = await AppointmentModel.findById(id);
        if (!appointment) {
            return res.status(404).json({ status: "error", message: "Không tìm thấy lịch hẹn" });
        }

        appointment.status = status;
        await appointment.save();

        res.status(200).json({ status: "success", data: appointment });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
};



exports.getMyAppointments = async (req, res) => {
    try {
        const userId = req.user._id; // req.user được gán bởi middleware xác thực token

        const appointments = await AppointmentModel.find({ user_id: userId })
            .populate('property_id') // nếu muốn lấy thông tin chi tiết property
            .populate('user_id', '-password') // ẩn mật khẩu người dùng nếu cần
            .sort({ scheduled_time: -1 });

        res.status(200).json({ status: "success", data: appointments });
    } catch (err) {
        res.status(500).json({ status: "error", message: 'Lỗi server', error: err.message });
    }
};



exports.createAppointment = async (req, res) => {
    try {
        const userId = req.user._id; // từ middleware xác thực token
        const { property_id, scheduled_time, note } = req.body;

        if (!property_id || !scheduled_time) {
            return res.status(400).json({ success: false, message: 'property_id và scheduled_time là bắt buộc' });
        }

        const appointment = new AppointmentModel({
            user_id: userId,
            property_id,
            scheduled_time,
            note: note || null
        });

        await appointment.save();

        res.status(201).json({ success: true, message: 'Đặt hẹn thành công', data: appointment });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
    }
};






