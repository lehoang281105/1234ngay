import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cartItems = useSelector((state) => state.cart.cartItems);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header>
      {/* Top Header */}
      <div
        className={`main-header ${isScrolled ? 'scrolled' : ''}`}
        style={{
          backgroundColor: isScrolled ? '#1c1c1e' : 'transparent',
          padding: isScrolled ? '10px 0' : '15px 0',
          borderBottom: isScrolled ? '2px solid #FFC107' : 'none',
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 1050,
          transition: 'all 0.3s ease',
          boxShadow: isScrolled ? '0 4px 10px rgba(0, 0, 0, 0.2)' : 'none',
        }}
      >
        <Container className="d-flex justify-content-between align-items-center">
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/images/logo/logo.png"
              alt="Logo"
              style={{
                maxHeight: isScrolled ? '40px' : '50px',
                transition: 'all 0.3s ease',
              }}
            />
          </Link>

          {/* SearchBox */}
          <div style={{ flex: 1, maxWidth: '600px', marginLeft: '20px' }}>
            <Route render={({ history }) => <SearchBox history={history} />} />
          </div>

          {/* Cart and Wishlist */}
          <div className="d-flex align-items-center">
            <Link
              to="/wishlist"
              style={{
                color: '#FFC107',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                marginRight: '20px',
              }}
            >
              <i className="fas fa-heart" style={{ marginRight: '5px' }}></i>
              Yêu thích
            </Link>
            <Link
              to="/cart"
              style={{
                color: '#FFC107',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
              }}
            >
              <i className="fas fa-shopping-cart" style={{ marginRight: '5px' }}></i>
              {totalPrice} ({totalItems})
            </Link>
          </div>
        </Container>
      </div>

      {/* Navbar */}
      <Navbar
        style={{
          backgroundColor: '#FFC107',
          padding: '10px 0',
          marginTop: '60px', // Ensure navbar does not overlap header
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
        expand="lg"
      >
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="mx-auto"
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}
            >
              <Link to="/" className="nav-link" style={navLinkStyle}>
                Trang chủ
              </Link>
              <Link to="/store" className="nav-link" style={navLinkStyle}>
                Cửa hàng
              </Link>
              <Link to="/contact" className="nav-link" style={navLinkStyle}>
                Liên hệ
              </Link>
              <Link to="/about" className="nav-link" style={navLinkStyle}>
                Về chúng tôi
              </Link>

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu" style={{ marginLeft: '20px' }}>
                  <NavDropdown.Item as={Link} to="/admin/dashboard">
                    Bảng quản trị
                  </NavDropdown.Item>
                </NavDropdown>
              )}

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username" style={{ marginLeft: '20px' }}>
                  <Link to="/profile" className="dropdown-item">
                    Thông tin cá nhân
                  </Link>
                  <NavDropdown.Item onClick={logoutHandler}>Đăng xuất</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link to="/login" className="nav-link" style={navLinkStyle}>
                  Đăng nhập
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

const navLinkStyle = {
  padding: '10px 15px',
  color: '#343a40',
  transition: 'color 0.3s ease',
  textDecoration: 'none',
};

export default Header;
