import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';

const ProductCarousel = () => {
  // Danh sách sản phẩm tĩnh
  const products = [
    {
      
      image: '/images/carousel/JBH5ybZ.jpeg',
     
    },
    {
     
      image: '/images/carousel/2YAi1iI.jpeg',
     
    },
    
  ];

  return (
    <Carousel
      pause="hover"
      interval={3000}
      indicators={true}
      controls={true}
      className="product-carousel"
    >
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image
              src={product.image}
              alt={product.name}
              fluid
              className="carousel-image"
            />
            <Carousel.Caption className="carousel-caption">
              <h3 className="carousel-title">{product.name}</h3>
              <p className="carousel-price">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(product.price)}
              </p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
