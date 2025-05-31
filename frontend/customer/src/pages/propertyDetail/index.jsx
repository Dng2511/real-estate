import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import { getPropertyDetails } from "../../shared/api/api";
import PropertyImageCarousel from "../../shared/components/PropertyImageCarousel"
import { Row, Col, Typography, Button, Tag, Space, Card, Divider, message } from "antd";
import { HeartOutlined, CalendarOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const PropertyDetail = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);

    useEffect(() => {
        getPropertyDetails(id).then(({ data }) => {
            setProperty(data.data);
        });
    }, [id]);

    if (!property) return <div style={{ textAlign: "center", padding: 50 }}>Đang tải...</div>;

    const address = `${property.address.street}, ${property.address.ward}, ${property.address.district}, ${property.address.city}`;
    const priceFormatted = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(property.price);

    return (
        <Card style={{ margin: "20px auto", maxWidth: 1000, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            {/* Image carousel */}


            <Row gutter={[24, 16]} style={{ marginTop: 24 }}>
                <Col span={16}>
                    <PropertyImageCarousel images={property.images} />
                    <Title level={2}>{property.title}</Title>
                    <Text type="secondary">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            {address}
                        </a></Text>
                    <Divider />
                    

                    <Space size="large" style={{ marginTop: 12 }}>
                        <Text strong>Giá:</Text>
                        <Text>{priceFormatted}</Text>
                        <Text strong>Diện tích:</Text>
                        <Text>{property.area} m²</Text>
                        <Text strong>Trạng thái:</Text>
                        <Tag color={property.status === "available" ? "green" : "red"}>
                            {property.status === "available" ? "Đang bán" : "Đã bán"}
                        </Tag>
                    </Space>
                    <Divider />
                    <Title level={3}>Thông tin mô tả</Title>
                    <Paragraph>{property.description}</Paragraph>

                    {/* <Space style={{ marginTop: 24 }}>
                        <Button
                            icon={<HeartOutlined />}
                            type="default"
                            onClick={() => message.success("Đã thêm vào yêu thích")}
                        >
                            Thêm vào yêu thích
                        </Button>
                        <Button
                            icon={<CalendarOutlined />}
                            type="primary"
                            onClick={() => message.info("Đặt lịch hẹn thành công")}
                        >
                            Đặt lịch hẹn
                        </Button>
                    </Space> */}
                </Col>

                <Col span={8}>
                    <div style={{ position: "sticky", top: 20 }}>
                        <Card bordered={false} style={{ backgroundColor: "#fafafa" }}>
                            <Space direction="vertical" style={{ width: "100%" }}>
                                <Button
                                    icon={<HeartOutlined />}
                                    type="default"
                                    block
                                    style={{ height: 48 }}
                                    onClick={() => message.success("Đã thêm vào yêu thích")}
                                >
                                    Thêm vào yêu thích
                                </Button>
                                <Button
                                    icon={<CalendarOutlined />}
                                    type="primary"
                                    block
                                    style={{ height: 48 }}
                                    onClick={() => message.info("Đặt lịch hẹn thành công")}
                                >
                                    Đặt lịch hẹn
                                </Button>
                            </Space>
                            <Divider />

                            <Text strong>Thông tin thêm</Text>
                            <div style={{ marginTop: 12 }}>
                                <Text type="secondary">Ngày tạo:</Text> <br />
                                <Text>{new Date(property.created_at).toLocaleDateString()}</Text>
                            </div>
                            <div style={{ marginTop: 12 }}>
                                <Text type="secondary">Ngày cập nhật:</Text> <br />
                                <Text>{new Date(property.updated_at).toLocaleDateString()}</Text>
                            </div>
                        </Card>
                    </div>
                </Col>

            </Row>
        </Card>
    );
};

export default PropertyDetail;
