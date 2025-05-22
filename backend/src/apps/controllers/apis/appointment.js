

const Appointment = require('../../models/Appointment');

exports.getAppointment = async (req, res) => {
    try {
        const { user_id, property_id } = req.query;

        // Tạo điều kiện lọc
        let filter = {};
        if (user_id) filter.user_id = user_id;
        if (property_id) filter.property_id = property_id;

        // Tìm kiếm theo filter và sắp xếp theo ngày giảm dần
        const appointments = await Appointment.find(filter).sort({ date: -1 });

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


