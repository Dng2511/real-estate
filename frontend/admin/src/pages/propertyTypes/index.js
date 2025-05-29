import React from "react";
import { getPropertyTypes } from "../../shared/api/api";
import { Table, Button } from 'antd';
import CreatePropertyTypeModal from "./createPropertyTypeModal";

const PropertyTypes = () => {
    const [propertyTypes, setPropertyTypes] = React.useState([]);
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    React.useEffect(() => {
        getPropertyTypes().then(({ data }) => setPropertyTypes(data.data));
        console.log(propertyTypes);
        
    }, [isModalVisible])







    const columns = [
        {
            title: 'ID',
            render: (_, __, index) => index + 1,
        },
        {
            title: 'Tên loại',
            dataIndex: 'name',
        },
    ];

    return (
        <div>
            <h2>Danh sách loại bất động sản</h2>
            <Button
                type="primary"
                style={{ marginBottom: 16 }}
                onClick={() => {setIsModalVisible(true)}}
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

