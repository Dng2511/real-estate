import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { getAppointments, getUsers } from "../../shared/api/api";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [usersMap, setUsersMap] = useState({});

  // Lấy dữ liệu người dùng và tạo map { userId: userName }
  // Lấy dữ liệu lịch hẹn
  useEffect(() => {
    getAppointments().then(({ data }) => {
      setAppointments(data.data);
    });
  }, []);

  const columns = [
    {
      title: "STT",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Khách hàng",
      dataIndex: ["user_id", "name"],
    },
    {
      title: "ID BĐS",
      dataIndex: "property_id",
    },
    {
      title: "Thời gian hẹn",
      dataIndex: "scheduled_time",
      render: (time) => new Date(time).toLocaleString(),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
    },
  ];

  return (
    <div>
      <h2>Danh sách lịch hẹn</h2>
      <Table dataSource={appointments} columns={columns} rowKey="_id" />
    </div>
  );
};

export default Appointments;
