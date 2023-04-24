import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([])
    const [carts, setCarts] = useState([])

    useEffect(() => {
        console.log('called useEffect1')
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    useEffect(() => {
        console.log('called useEffect2')
        const storedCart = getShoppingCart();
        const savedCart = [];
        // step 1: get id of the addedProduct
        for (const id in storedCart) {
            const addedProduct = products.find(product => product.id == id)
            if (addedProduct) {
                const newQuantity = storedCart[id]
                addedProduct.quantity = newQuantity
                console.log(addedProduct)
                savedCart.push(addedProduct)
            }
            // step 2: get product from products state by using id
        }
        setCarts(savedCart)

    }, [products])


    const handleDeleteCart = () => {
        setCarts([])
        deleteShoppingCart();
    }
    const handleAddToCart = coming_product => {
        let new_cart = []
        const exist = carts.find(pd => pd.id == coming_product.id)

        if (!exist) {

            coming_product.quantity = 1;
            new_cart = [...carts, coming_product]
        }
        else {
            const restProduct = carts.filter(pd => pd.id != coming_product.id)
            exist.quantity = exist.quantity + 1
            new_cart = [...restProduct, exist]

        }
        console.log(new_cart)
        setCarts(new_cart)
        addToDb(coming_product.id)


    }


    return (
        <div className='shop-container'>
            <div className="product-container">

                {
                    products.map(product => <Product key={product.id} product={product} handleAddToCart={handleAddToCart} ></Product>)
                }

            </div>
            <div className="cart-container">
                <h1>this is cart</h1>

                <Cart handleDeleteCart={handleDeleteCart} carts={carts}></Cart>

            </div>

        </div>
    );
};

export default Shop;