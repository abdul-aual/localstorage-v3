import React, { useEffect, useState } from 'react';
import fakeData from './fakedata.json';
import Product from './Product';
import './products.css';// Add styles for positioning the cart

const Products = () => {
  const [products, setProducts] = useState(
    fakeData.map((product) => ({
      ...product,
      clicked: false,
      quantity: 0,
    }))
  );
  const [cart, setCart] = useState({ TotalItems: 0, TotalAmount: 0, Items: [] });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleClickBtn = (id) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, clicked: true, quantity: 1 } : product
    );
    setProducts(updatedProducts);

    const selectedProduct = products.find((product) => product.id === id);
    const existingItem = cart.Items.find((item) => item.id === id);
    setCart((preVcart) => {
      const updatedItems = existingItem
        ? preVcart.Items.map((item) =>
            item.id === id ? { ...item, clicked: true, quantity: item.quantity + 1 } : item
          )
        : [...preVcart.Items, { ...selectedProduct, quantity: 1, clicked: true }];
      return {
        TotalItems: updatedItems.length,
        TotalAmount: preVcart.TotalAmount + selectedProduct.MRP,
        Items: updatedItems,
      };
    });
  };

  const inc = (id) => {
    const selectedProduct = products.find((product) => product.id === id);
    const incProduct = products.map((product) =>
      product.id === id ? { ...product, quantity: product.quantity + 1 } : product
    );
    setProducts(incProduct);

    setCart((preVcart) => {
      const updatedItems = preVcart.Items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      return {
        TotalItems: updatedItems.length,
        TotalAmount: preVcart.TotalAmount + selectedProduct.MRP,
        Items: updatedItems,
      };
    });
  };

  const dec = (id) => {
    const selectedProduct = products.find((product) => product.id === id);
    const decProduct = products.map((product) =>
      product.id === id
        ? product.quantity > 1
          ? { ...product, quantity: product.quantity - 1, clicked: true }
          : { ...product, quantity: 0, clicked: false }
        : product
    );
    setProducts(decProduct);

    setCart((prevCart) => {
      const updatedItems = prevCart.Items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      ).filter((item) => item.quantity > 0);

      return {
        TotalItems: updatedItems.length,
        TotalAmount: prevCart.TotalAmount - selectedProduct.MRP,
        Items: updatedItems,
      };
    });
  };

  return (
    <div className="products-container">
      {/* Product List */}
      <div className="product-list">
        {products.map((pd, index) => (
          <Product
            key={index}
            pdData={pd}
            handleClickBtn={handleClickBtn}
            inc={inc}
            dec={dec}
          />
        ))}
      </div>

      {/* Static Cart */}
      <div className="cart">
        <p>{cart.TotalItems} Items</p>
        <p>Total Amount: ${cart.TotalAmount}</p>
        <ul>
          {cart.Items.map((item) => (
            <li style={{listStyle:'none'}} key={item.id}>
              {item.Nm} x {item.quantity} (${item.MRP})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Products;
