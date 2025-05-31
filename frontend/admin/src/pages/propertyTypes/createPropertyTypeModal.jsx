// src/components/CreatePropertyModal.js
import { Modal, Form, Input } from 'antd';
import { createPropertyType } from '../../shared/api/api';


const CreatePropertyTypeModal = ({ visible, onCancel}) => {
        

    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields()
            .then(values => {
                console.log(values);
                createPropertyType(values);
                form.resetFields();
                onCancel();
            })
            .catch(info => {
                console.log("Lỗi:", info);
            });
    };

    return (
        <Modal
            title="Tạo bất động sản mới"
            open={visible}
            onCancel={() => {
                form.resetFields();
                onCancel();
            }}
            onOk={handleOk}
            okText="Tạo"
            cancelText="Hủy"
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="name"
                    label="TLoại bất động sản"
                    rules={[{ required: true, message: "Vui lòng nhập loại bất động sản" }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreatePropertyTypeModal;
