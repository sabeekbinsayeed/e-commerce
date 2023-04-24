import React from 'react';
import './Cart.css'

const Cart = ({ carts, handleDeleteCart, children }) => {
    let total = 0
    let shipping = 0;
    let quantity = 0;
    for (const product of carts) {
        quantity = quantity + product.quantity;
        total = total + product.price * product.quantity
        shipping = shipping + product.shipping
    }
    let tax = ((total + shipping) * 0.1).toFixed(2)
    tax = parseFloat(tax)
    const finaltotal = tax + total + shipping

    return (
        <div className='cart'>
            <h1>this is cart {quantity}</h1>
            <p> price:{total} </p>
            <p>total shipping: {shipping}  </p>
            <p>tax: {tax} </p>
            <p>Grand total:{finaltotal} </p>
            <button onClick={handleDeleteCart}>delete Cart</button>
            {
                children
            }

        </div>
    );
};

export default Cart;