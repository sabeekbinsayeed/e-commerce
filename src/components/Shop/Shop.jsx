import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([])
    const [carts, setCarts] = useState([])

    const handleAddToCart = product => {
        const newcart = [...carts, product]
        setCarts(newcart)
        console.log('clicked')
    }
    useEffect(
        () => {
            fetch('products.JSON').then(res => res.json()).then(data => setProducts(data))
        }
        , [])
    return (
        <div className='shop-container'>
            <div className="product-container">

                {
                    products.map(product => <Product key={product.id} product={product} handleAddToCart={handleAddToCart} ></Product>)
                }

            </div>
            <div className="cart-container">
                <h1>this is cart</h1>

                <Cart carts={carts}></Cart>

            </div>

        </div>
    );
};

export default Shop;