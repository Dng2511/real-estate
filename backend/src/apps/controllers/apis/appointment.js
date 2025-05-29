

const Appointment = require('../../models/Appointment');

exports.getAppointment = async (req, res) => {
    try {
        const { user_id, property_id } = req.query;

        // Tạo điều kiện lọc
        let filter = {};
        if (user_id) filter.user_id = user_id;
        if (property_id) filter.property_id = property_id;

        // Tìm kiếm theo filter và sắp xếp theo ngày giảm dần
        const appointments = await Appointment.find(filter)
            .populate('user_id', 'name email phone') // chỉ lấy trường name và email
            .populate('property_id', 'title address') // chỉ lấy trường name và address
            .sort({ scheduled_time: -1 });

        res.status(200).json({
            status: "success",
            data: appointments,
            count: appointments.length,
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

        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({ status: "error", message: "Không tìm thấy lịch hẹn" });
        }

        // Xoay vòng trạng thái
        const statusCycle = ["pending", "confirmed", "rejected"];
        const currentIndex = statusCycle.indexOf(appointment.status);
        const nextStatus = statusCycle[(currentIndex + 1) % statusCycle.length];

        appointment.status = nextStatus;
        await appointment.save();

        res.status(200).json({ status: "success", data: appointment });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
};




