import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCarousel from '../components/ProductCarousel';
import Banner from '../components/Banner';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import { listProducts } from '../actions/productActions';

const FeatureSection = () => (
  <Container className="py-5">
    <Row className="text-center">
      {[
        {
          img: '/images/icon/icon-shipping.jpg',
          title: 'Miễn phí giao hàng',
          desc: 'Miễn phí vận chuyển tất cả các đơn hàng',
        },
        {
          img: '/images/icon/icon-support.jpg',
          title: 'Hỗ trợ 24/7',
          desc: 'Liên hệ bất kỳ lúc nào',
        },
        {
          img: '/images/icon/icon-refund.jpg',
          title: 'Hoàn tiền 100%',
          desc: 'Bạn có 15 ngày để quay lại',
        },
        {
          img: '/images/icon/icon-return.png',
          title: '30 ngày trả hàng',
          desc: 'Nếu sản phẩm có vấn đề',
        },
      ].map((feature, index) => (
        <Col key={index} md={3} className="mb-4 mb-md-0">
          <img src={feature.img} alt={feature.title} width="50" />
          <h5 className="mt-2">{feature.title}</h5>
          <p>{feature.desc}</p>
        </Col>
      ))}
    </Row>
  </Container>
);

const SectionTitle = ({ children }) => (
  <div
    className="section-title text-center my-5"
    style={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <hr
      style={{
        flex: 1,
        height: '2px',
        backgroundColor: '#FFD700',
        border: 'none',
      }}
    />
    <span
      style={{
        padding: '0 15px',
        fontSize: '24px',
        fontWeight: 'bold',
        backgroundColor: '#fff',
        textTransform: 'uppercase',
      }}
    >
      {children}
    </span>
    <hr
      style={{
        flex: 1,
        height: '2px',
        backgroundColor: '#FFD700',
        border: 'none',
      }}
    />
  </div>
);

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />

      {!keyword && <ProductCarousel />}

      <FeatureSection />

      <Container className="py-4">
        <Row className="justify-content-center">
          {['/images/banner/img2-middle-sinrato1.jpg', '/images/banner/img1-middle-sinrato1.jpg'].map((img, index) => (
            <Col key={index} md={6} className="text-center">
              <img
                src={img}
                alt={`Top Banner ${index + 1}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '10px',
                }}
              />
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="py-5">
        <SectionTitle>Sản Phẩm Bán Chạy</SectionTitle>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : products && products.length > 0 ? (
          <Row>
            {products.slice(0, 4).map((product) => (
              <Col key={product._id} sm={12} md={6} lg={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        ) : (
          <Message variant="info">Không có sản phẩm nào</Message>
        )}
      </Container>

      <Banner position="middle" />

      <Container className="py-5">
        <SectionTitle>Tất Cả Sản Phẩm</SectionTitle>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : products && products.length > 0 ? (
          <>
            <Row style={{ gap: '0px' }}>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate pages={pages} page={page} keyword={keyword || ''} />
          </>
        ) : (
          <Message variant="info">Không tìm thấy sản phẩm</Message>
        )}
      </Container>

      <div className="footer-banner">
        <img
          src="/images/banner/img-bottom-sinrato1.jpg"
          alt="Footer Banner"
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '10px',
            marginBottom: '20px',
          }}
        />
      </div>
    </>
  );
};

export default HomeScreen;
