import { Carousel, Image } from "antd";
import { useRef } from "react";
import ImageLink from "./ImageLink";

const PropertyImageCarousel = ({ images }) => {
  const carouselRef = useRef(null);

  return (
    <div>
      {/* Main Carousel */}
      <Carousel ref={carouselRef} autoplay dots={false}>
        {images.map((img) => (
          <Image
            key={img._id}
            src={ImageLink(img.url)}
            alt={img.description}
            height={400}
            style={{ objectFit: "cover" }}
            preview={false}
          />
        ))}
      </Carousel>

      {/* Thumbnails below */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "10px",
          overflowX: "auto",
          paddingBottom: 10,
        }}
      >
        {images.map((img, index) => (
          <div
            key={img._id}
            onClick={() => carouselRef.current?.goTo(index)}
            style={{
              cursor: "pointer",
              borderRadius: 4,
              overflow: "hidden",
              border: "2px solid #eee",
              flexShrink: 0,
            }}
          >
            <Image
              src={ImageLink(img.url)}
              alt={img.description}
              width={100}
              height={70}
              preview={false}
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyImageCarousel;