import React from "react";
import { deleteProperty, getProperties } from "../../shared/api/api";
import { useSearchParams } from "react-router-dom";
import { Button, Table } from 'antd';
import CreatePropertyModal from "./createPropertyModal";
import { DeleteFilled } from '@ant-design/icons';
import ImageLink from "../../shared/components/ImageLink";



const Properties = () => {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [properties, setProperties] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [total, setTotal] = React.useState();


    React.useEffect(() => {
        getProperties({
            params: {
                limit: 10,
                page: page,
            }
        }).then(({ data }) => {
            setProperties(data.data);
            setTotal(data.pages.totalRows)
        });
    }, [page, isModalVisible])

    const handleChangePage = (pagination) => {
    setPage(pagination.current);
};


    const handleDelete = async (id) => {
        try {
            console.log(id);
            await deleteProperty(id);
            setProperties(prev => prev.filter(item => item._id !== id))
        } catch (e) {
            console.log(e);
            alert(e);
        }
        

    }

    const columns = [
        {
            title: "ID",
            width: 80,
            render: (_, __, index) => (page - 1) * 10 + index + 1,
        },
        {
            title: "Ảnh đại diện",
            dataIndex: "images",
            render: (images) => {
                if (!images || images.length === 0) return null;
                return (
                    <img
                        src={ImageLink(images[0].url)}
                        alt={images[0].description || "ảnh đại diện"}
                        style={{ width: 100, height: 60, objectFit: "cover", borderRadius: 4 }}
                    />
                );
            },
        },
        {
            title: "Tiêu đề",
            dataIndex: "title",
        },
        {
            title: "Giá (VNĐ)",
            dataIndex: "price",
            render: (price) => price?.toLocaleString("vi-VN"),
        },
        {
            title: "Diện tích (m²)",
            dataIndex: "area",
        },
        {
            title: "Tình trạng",
            dataIndex: "status",
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            render: (address) => {
                if (!address) return "";
                const { street, ward, district, city } = address;
                return [street, ward, district, city].filter(Boolean).join(", ");
            },
        },
        {
            title: "Bản đồ",
            dataIndex: "location",
            render: (location) => {
                if (!location) return null;
                const src = `https://www.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`;
                return (
                    <iframe
                        title="Google Map"
                        width="150"
                        height="100"
                        frameBorder="0"
                        style={{ border: 0 }}
                        src={src}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                );
            },
        },
        {
            title: 'Hành động',
            width: 160,
            render: (_, record) => (
                <Button
                    type="text"
                    danger
                    icon={<DeleteFilled />}
                    onClick={() => handleDelete(record._id)}
                />
            ),
        }

    ];


    return (
        <div>
            <h2>Danh sách bất động sản</h2>
            <Button
                type="primary"
                style={{ marginBottom: 16 }}
                onClick={() => { setIsModalVisible(true) }}
            >
                Tạo bất động sản
            </Button>
            <Table
                rowKey="id"
                dataSource={properties}
                columns={columns}
                pagination={{ pageSize: 10, current: page, total: total }}
                onChange={handleChangePage}
            />
            <CreatePropertyModal
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
            />

        </div>

    );
}

export default Properties;

