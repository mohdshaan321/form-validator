import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
  const [loggedInUser, setLoggedIn] = useState('');
  const [products, setProducts] = useState([]); // 🆕 Add products state
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(localStorage.getItem('loggedInUser'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('token');
    handleSuccess('User successfully logout');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const fetchProducts = async () => {
    let storedToken = localStorage.getItem('token');

    if (!storedToken) {
      console.error('❌ No token available');
      return;
    }

    storedToken = storedToken.replace(/^"|"$/g, '');

    const url = 'http://localhost:8081/products';
    const headers = {
      Authorization: `Bearer ${storedToken}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers,
      });

     
      const result = await response.json();

      if (response.ok) {
       
        setProducts(result); // 🆕 Save products to state
      } else {
        console.error('❌ Failed to fetch products:', result);
      }
    } catch (err) {
      console.error('🔥 Network or fetch error:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Welcome, {loggedInUser}</h1>
      <button onClick={handleLogout}>Log Out</button>

      <h2>🛍️ Products</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul>
          {products.map((item) => (
            <li key={item._id}>
              <strong>{item.name}</strong> - ₹{item.price}
              <br />
              <em>{item.description}</em>
            </li>
          ))}
        </ul>
      )}

      <ToastContainer />
    </div>
  );
}

export default Home;
