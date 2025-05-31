import { useEffect, useRef, useState } from "react";
import { Row, Col, Spin } from "antd";
import { getProperties, getPropertyByType } from "../../shared/api/api";
import PropertyCard from "../../shared/components/PropertyCard";
import { useParams } from "react-router-dom";

const PropertyType = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(true);
    const id = useParams().id;
    const observerRef = useRef(null);
    const loadMoreRef = useRef();

    // Gọi API mỗi khi page thay đổi
    useEffect(() => {
        setLoading(true);
        getProperties({ page, limit: 8 }).then(({data}) => {
                setProperties((prev) => [...prev, ...data.data]);
                setHasNext(data.pages?.hasNext);
                setLoading(false);
        })
       

    }, [page]);

    useEffect(() => {
        getPropertyByType(id, {page, limit: 8}).then(({data}) => {
            setProperties(data.data);
            setHasNext(data.pages?.hasNext);
        })
    },[id])

    // IntersectionObserver để tự động tải thêm khi cuộn đến loadMoreRef
    useEffect(() => {
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNext && !loading) {
                setPage((prev) => prev + 1);
            }
        });

        if (loadMoreRef.current) {
            observerRef.current.observe(loadMoreRef.current);
        }

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, [hasNext, loading]);

    return (
        <div style={{ padding: "20px" }}>
            <Row gutter={[16, 16]} justify="center">
                {properties.map((p) => (
                    <Col key={p._id}>
                        <PropertyCard property={p} />
                    </Col>
                ))}
            </Row>

            {loading && <Spin style={{ display: "block", margin: "20px auto" }} />}

            {/* Điểm đánh dấu load thêm */}
            <div ref={loadMoreRef} style={{ height: "1px" }} />
        </div>
    );
}

export default PropertyType;