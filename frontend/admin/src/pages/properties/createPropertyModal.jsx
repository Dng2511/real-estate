// src/components/CreatePropertyModal.js
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Upload, Button, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getPropertyTypes, postProperty } from '../../shared/api/api';

const CreatePropertyModal = ({ visible, onCancel }) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = React.useState([]);
    const [propertyTypes, setPropertyTypes] = React.useState([]);
    const [defaultType, setDefaultType] = React.useState();

    React.useEffect(() => {
        getPropertyTypes().then(({ data }) => {
            setPropertyTypes(data.data);
            setDefaultType(data.data[0]._id);
            console.log(data.data)
        });


    }, [])

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            // Tạo object address đầy đủ
            const address = {
                street: values.address?.street || "",
                ward: values.address?.ward || "",
                district: values.address?.district || "",
                city: values.address?.city || ""
            };

            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("price", values.price);
            formData.append("area", values.area);
            formData.append("status", values.status);
            formData.append("type_id", values.type_id);

            formData.append("address", JSON.stringify(address));

            fileList.forEach(file => {
                formData.append("images", file.originFileObj);
            });

            console.log(formData);
            await postProperty(formData);

            form.resetFields();
            setFileList([]);
            onCancel();
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <Modal
            title="Tạo bất động sản mới"
            open={visible}
            onCancel={() => {
                form.resetFields();
                setFileList([]);
                onCancel();
            }}
            onOk={handleOk}
            okText="Tạo"
            cancelText="Hủy"
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="title"
                    label="Tiêu đề"
                    rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="price"
                    label="Giá (VNĐ)"
                    rules={[{ required: true, message: "Vui lòng nhập giá" }]}
                >
                    <InputNumber style={{ width: "100%" }} min={0} />
                </Form.Item>

                <Form.Item
                    name="area"
                    label="Diện tích (m²)"
                    rules={[{ required: true, message: "Vui lòng nhập diện tích" }]}
                >
                    <InputNumber style={{ width: "100%" }} min={0} />
                </Form.Item>

                <Form.Item
                    name="status"
                    label="Tình trạng"
                    initialValue="available"
                    rules={[{ required: true, message: "Vui lòng chọn tình trạng" }]}
                >
                    <Select placeholder="Chọn tình trạng">
                        <Select.Option value="available">Đang bán</Select.Option>
                        <Select.Option value="sold">Đã bán</Select.Option>
                        <Select.Option value="rented">Đã thuê</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="type_id"
                    label="Loại"
                    initialValue={defaultType}
                    rules={[{ required: true, message: "Vui lòng chọn loại BDS " }]}
                >
                    <Select placeholder="Chọn loại BDS">
                        {propertyTypes.map((item) => (
                            <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name={["address", "city"]}
                            label="Thành phố"
                            rules={[{ required: true, message: "Vui lòng nhập thành phố" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            name={["address", "district"]}
                            label="Quận/Huyện"
                            rules={[{ required: true, message: "Vui lòng nhập quận/huyện" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            name={["address", "ward"]}
                            label="Phường/Xã"
                            rules={[{ required: true, message: "Vui lòng nhập phường/xã" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                {/* Địa chỉ: street */}
                <Form.Item
                    name={["address", "street"]}
                    label="Đường"
                    rules={[{ required: true, message: "Vui lòng nhập đường" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Hình ảnh">
                    <Upload
                        listType="picture"
                        fileList={fileList}
                        onChange={({ fileList: newList }) => setFileList(newList)}
                        beforeUpload={() => false} // Không upload ngay, chỉ preview
                        multiple
                    >
                        <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreatePropertyModal;
