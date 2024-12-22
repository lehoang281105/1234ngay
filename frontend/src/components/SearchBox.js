import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  const styles = {
    form: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      borderRadius: '50px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
    },
    input: {
      flex: 1,
      border: 'none',
      padding: '12px 20px',
      outline: 'none',
      fontSize: '14px',
      color: '#333',
      borderRadius: '50px 0 0 50px',
    },
    button: {
      backgroundColor: '#111',
      border: 'none',
      color: '#fff',
      fontWeight: 'bold',
      padding: '12px 20px',
      borderRadius: '0 50px 50px 0',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonHover: {
      backgroundColor: '#FFC107',
    },
    placeholderIcon: {
      marginRight: '10px',
      color: '#999',
      fontSize: '16px',
    },
  };

  return (
    <Form onSubmit={submitHandler} style={styles.form}>
      <input
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="🔍 Tìm kiếm sản phẩm, danh mục..."
        style={styles.input}
      />
      <Button
        type="submit"
        style={styles.button}
        onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
      >
        Tìm
      </Button>
    </Form>
  );
};

export default SearchBox;
