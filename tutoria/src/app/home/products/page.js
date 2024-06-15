"use client"
import React, { useState, useEffect } from 'react';
import './ProductList.css';

const ProductList = () => {
  const initialProducts = [
    {
      "id": 1,
      "name": "Laptop",
      "price": 999.99
    },
    {
      "id": 2,
      "name": "Smartphone",
      "price": 699.99
    },
    {
      "id": 3,
      "name": "Tablet",
      "price": 399.99
    },
    {
      "id": 4,
      "name": "Headphones",
      "price": 199.99
    },
    {
      "id": 5,
      "name": "Smartwatch",
      "price": 249.99
    }
  ];

  const [products, setProducts] = useState(() => {
    const storedProducts = localStorage.getItem('products');
    return storedProducts ? JSON.parse(storedProducts) : initialProducts;
  });

  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const getNextId = () => {
    const ids = products.map(product => product.id);
    return ids.length ? Math.max(...ids) + 1 : 1;
  };

  const addProduct = () => {
    if (newProductName.trim() && !isNaN(newProductPrice) && newProductPrice > 0) {
      const newProduct = {
        id: getNextId(),
        name: newProductName,
        price: parseFloat(newProductPrice)
      };
      setProducts([...products, newProduct]);
      setNewProductName('');
      setNewProductPrice('');
    }
  };

  return (
    <div>
      <h1>Product List</h1>
      <ul className="product-list">
        {products.map(product => (
          <li key={product.id} className="product-item">
            <span className="product-name">{product.name}</span> - 
            <span className="product-price"> ${product.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="add-product-form">
        <input
          type="text"
          placeholder="Product Name"
          value={newProductName}
          onChange={e => setNewProductName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Product Price"
          value={newProductPrice}
          onChange={e => setNewProductPrice(e.target.value)}
        />
        <button className="add-product-button" onClick={addProduct}>
          Add Product
        </button>
      </div>
    </div>
  );
};

export default ProductList;
