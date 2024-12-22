import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded shadow-sm product-card">
      {/* Product Image */}
      <Link to={`/product/${product._id}`} className="product-link">
        <Card.Img
          src={product.image}
          variant="top"
          className="product-img"
          alt={product.name}
        />
      </Link>

      {/* Product Content */}
      <Card.Body className="product-body">
        {/* Product Name */}
        <Link to={`/product/${product._id}`} className="product-link">
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        {/* Product Brand */}
        <Card.Text as="div" className="product-brand text-muted">
          Thương hiệu: <strong>{product.brand}</strong>
        </Card.Text>

        {/* Product Rating */}
        <Card.Text as="div" className="product-rating">
          <Rating value={product.rating} text={`${product.numReviews} đánh giá`} color="#f8e825" />
        </Card.Text>

        {/* Product Price */}
        <Card.Text as="h3" className="product-price text-success">
          {new Intl.NumberFormat('vi-VN').format(product.price)} VNĐ
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
