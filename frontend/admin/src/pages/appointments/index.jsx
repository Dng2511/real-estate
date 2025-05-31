import { useEffect, useState } from "react";
import { Table, Dropdown, Menu } from "antd";
import { getAppointments, updateAppointmentStatus } from "../../shared/api/api";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const statusOptions = [
    { name: "pending", color: "#1890ff" },    // xanh dương (chờ xử lý)
    { name: "accepted", color: "#52c41a" },   // xanh lá
    { name: "rejected", color: "#ff4d4f" },   // đỏ
    { name: "cancelled", color: "#faad14" },  // vàng cam
    { name: "completed", color: "#722ed1" },  // tím (đã hoàn thành)
  ]




  useEffect(() => {
    getAppointments().then(({ data }) => {
      setAppointments(data.data);
    });
  }, []);





  const updateStatus = async (id, status) => {
    try{   
      await updateAppointmentStatus(id, {status});
      setAppointments(prev => prev.map(app => app._id === id ? { ...app, status } : app))

    } catch (e) {
      alert(e);
    }
      
  }





  const columns = [
    {
      title: "ID",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Khách hàng",
      dataIndex: ["user_id", "name"],
    },
    {
      title: "BĐS",
      dataIndex: ["property_id", "title"],
    },
    {
      title: "Thời gian hẹn",
      dataIndex: "scheduled_time",
      render: (time) => new Date(time).toLocaleString(),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (_, record) =>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                {statusOptions.filter(s => s.name !== record.status).map((s) => (
                  <Menu.Item
                    key={s.name}
                    onClick={() => updateStatus(record._id, s.name)}
                  >
                    <span
                      style={{
                        width: "100px",
                        display: "flex",
                        justifyContent: "center",
                        padding: "2px 10px",
                        borderRadius: "20px",
                        backgroundColor: s.color + "33", // mờ nhẹ
                        color: s.color,
                        fontWeight: 500,
                      }}
                    >
                      {s.name}
                    </span>
                  </Menu.Item>
                ))}
              </Menu>
            }
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100px",
                padding: "2px 10px",
                borderRadius: "20px",
                backgroundColor: statusOptions.find(s => s.name === record.status).color+33, // màu xanh nhạt
                color: statusOptions.find(s => s.name === record.status).color,              // màu chữ xanh đậm
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              {record.status}
            </span>
          </Dropdown>
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
