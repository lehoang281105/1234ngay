import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProducts } from '../actions/productActions';


const StoreScreen = () => {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 20000000 });
  const [sortOption, setSortOption] = useState({ field: '', order: '' });
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  // Memoized danh sách thương hiệu duy nhất
  const brands = useMemo(
    () => [...new Set(products.map((product) => product.brand))],
    [products]
  );

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  // Lọc và sắp xếp sản phẩm
  const filteredProducts = useMemo(() => {
    const filtered = products
      .filter(
        (product) =>
          product.price >= priceRange.min &&
          product.price <= priceRange.max &&
          (selectedBrands.length === 0 || selectedBrands.includes(product.brand))
      )
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt)) // Sắp xếp sản phẩm mới nhất trước
      .sort((a, b) => {
        if (sortOption.field === 'name') {
          return sortOption.order === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        }
        if (sortOption.field === 'price') {
          return sortOption.order === 'asc' ? a.price - b.price : b.price - a.price;
        }
        return 0;
      });
    return filtered;
  }, [products, priceRange, selectedBrands, sortOption]);

  // Lấy sản phẩm trên trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleSliderChange = (e) => {
    setPriceRange({ ...priceRange, max: parseInt(e.target.value, 10) });
  };

  const handleSort = (field) => {
    setSortOption((prev) => ({
      field,
      order: prev.order === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleBrandToggle = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const resetFilters = () => {
    setPriceRange({ min: 0, max: 20000000 });
    setSelectedBrands([]);
    setSortOption({ field: '', order: '' });
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="store-container">
      {/* Sidebar */}
      <aside className="store-sidebar">
        <div className="filter-section">
          <h4>Lọc Theo Giá</h4>
          <p>Đến: {priceRange.max.toLocaleString()} VND</p>
          <input
            type="range"
            min={priceRange.min}
            max="20000000"
            step="500000"
            value={priceRange.max}
            onChange={handleSliderChange}
            className="slider"
          />
          <button className="filter-reset-btn" onClick={resetFilters}>
            Xóa Bộ Lọc
          </button>
        </div>

        <div className="brand-section">
          <h4>Lọc Theo Thương Hiệu</h4>
          {brands.map((brand) => (
            <label key={brand} className="brand-checkbox">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandToggle(brand)}
              />
              {brand}
            </label>
          ))}
        </div>

        <div className="sidebar-banner-section">
          <img
            src="/images/banner/img-module2.jpg"
            alt="Banner Sidebar 1"
            className="sidebar-banner"
          />
          <img
            src="/images/banner/img-module3.jpg"
            alt="Banner Sidebar 2"
            className="sidebar-banner"
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="store-main">
        <div className="store-banner">
          <img
            src="/images/banner/category-image.jpg"
            alt="Banner Cửa Hàng"
            className="main-banner"
          />
          <h1 className="store-title">Cửa Hàng</h1>
        </div>

        <div className="store-controls">
          <h4>{filteredProducts.length} sản phẩm</h4>
          <div>
            <button
              className={`sort-btn ${sortOption.field === 'name' ? 'active' : ''}`}
              onClick={() => handleSort('name')}
            >
              Tên {sortOption.field === 'name' && (sortOption.order === 'asc' ? '↑' : '↓')}
            </button>
            <button
              className={`sort-btn ${sortOption.field === 'price' ? 'active' : ''}`}
              onClick={() => handleSort('price')}
            >
              Giá {sortOption.field === 'price' && (sortOption.order === 'asc' ? '↑' : '↓')}
            </button>
          </div>
        </div>

        <div className="product-list">
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            currentProducts.map((product) => (
              <Product key={product._id} product={product} />
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`page-btn ${page === currentPage ? 'active' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Footer Banner */}
        <div className="footer-banner">
          <img
            src="/images/banner/img-middle-sinrato3.jpg"
            alt="Banner Cuối"
            className="footer-banner-img"
          />
        </div>
      </main>
    </div>
  );
};

export default StoreScreen;