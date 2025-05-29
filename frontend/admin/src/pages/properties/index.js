import React from "react";
import { getProperties } from "../../shared/api/api";
import { useSearchParams } from "react-router-dom";
import { Button, Table } from 'antd';
import CreatePropertyModal from "./createPropertyModal";



const Properties = () => {
    const [searchParams] = useSearchParams();
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [properties, setProperties] = React.useState([]);
    const page = searchParams.get("page") || 1;


    React.useEffect(() => {
        getProperties({
            params: {
                limit: 12,
                page: page,
            }
        }).then(({ data }) => setProperties(data.data));
    }, [page, isModalVisible])

    const columns = [
        {
            title: "STT",
            render: (_, __, index) => (page - 1) * 10 + index + 1,
        },
        {
            title: "Ảnh đại diện",
            dataIndex: "images",
            render: (images) => {
                if (!images || images.length === 0) return null;
                return (
                    <img
                        src={images[0].url}
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
            <Table dataSource={properties} columns={columns} />
            <CreatePropertyModal
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
            />

        </div>

    );
}

export default Properties;

