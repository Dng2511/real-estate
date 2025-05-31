// components/PropertyCard.jsx
import { Card, Button } from "antd";
import { EnvironmentOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ImageLink from "./ImageLink";

const PropertyCard = ({ property }) => {
  return (
    <Card
      hoverable
      cover={<img alt={property.title} src={ImageLink(property.images[0]? property.images[0].url : "default.png")} style={{ height: 200, objectFit: "cover" }} />}
      style={{ width: 300, margin: "10px auto" }}
    >
      <h3 style={{ fontWeight: "bold" }}>{property.title}</h3>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
        <Button 
          icon={<EnvironmentOutlined />}
          type="primary"
          onClick={() => window.open(`https://maps.google.com?q=${property.location}`, "_blank")}
          style={{ width: 120 }}
        >
          Vị trí
        </Button>
        <Link to={`/properties/${property._id}`}>
          <Button icon={<InfoCircleOutlined />}
          style={{ width: 120 }}>Chi tiết</Button>
          
        </Link>
        
      </div>
    </Card>
  );
};

export default PropertyCard;
