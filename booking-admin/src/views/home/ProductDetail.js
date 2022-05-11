import axios from "axios";
import React, { useEffect, useState, useContext } from "react";

import { CartDispatchContext, addToCart } from "../../contexts/cart";
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
export default function ProductDetail(props) {
  let id = props.id;
  console.log(id);
  const [product, setProduct] = useState([props]);
  const fetchData = async () => {
    const { data } = await axios.get("/api/products/" + id);
    setProduct(data);
    console.log(data);
  };
  const dispatch = useContext(CartDispatchContext);
  const handleAddToCart = () => {
    // console.log("__product__", product);
    const productItem = {
      props: {
        id: product.id,
        image: "/upload/" + product.image,
        title: product.title,
        subtitle: product.description,
        text: product.price,
      },
      quantity: 1,
    };
    addToCart(dispatch, productItem);
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(product);
  return (
    <Container style={{ marginTop: "75px" }}>
      {product && (
        <Card>
          <Row>
            <Col md={6}>
              <CardImg
                width="450"
                alt="Card image cap"
                src={"/upload/" + product.image}
                top
              />
            </Col>
            <Col md={6}>
              <CardBody>
                <CardTitle tag="h5">{product.title}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {product.category?.name}
                </CardSubtitle>
                <CardText>{product.description}</CardText>
                <Button onClick={handleAddToCart} color="primary">
                  Thêm Vào Giỏ
                </Button>
              </CardBody>
            </Col>
          </Row>
        </Card>
      )}
    </Container>
  );
}
