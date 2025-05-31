import React from "react";
import { deletePropertyType, getPropertyTypes } from "../../shared/api/api";
import { Table, Button } from 'antd';
import CreatePropertyTypeModal from "./createPropertyTypeModal";
import { DeleteFilled } from '@ant-design/icons';


const PropertyTypes = () => {
    const [propertyTypes, setPropertyTypes] = React.useState([]);
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    React.useEffect(() => {
        getPropertyTypes().then(({ data }) => setPropertyTypes(data.data));
        console.log(propertyTypes);

    }, [isModalVisible])

    const handleDelete = async (id) => {
        try {
            await deletePropertyType(id)
        } catch(e) {
            alert(e);
        }
    }







    const columns = [
        {
            title: 'ID',
            width: 80,
            render: (_, __, index) => index + 1,
        },
        {
            title: 'Tên loại',
            dataIndex: 'name',
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
            <h2>Danh sách loại bất động sản</h2>
            <Button
                type="primary"
                style={{ marginBottom: 16 }}
                onClick={() => { setIsModalVisible(true) }}
            >Tạo loại bất dộng sản</Button>
            <Table dataSource={propertyTypes} columns={columns} />
            <CreatePropertyTypeModal
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
            />
        </div>

    );
}

export default PropertyTypes;

