import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'



const Product = (props) => {
    const { name, price, seller, img, ratings } = props.product


    return (
        <div className='product'>
            <img src={img}></img>
            <div className='product-info'>
                <p className='product-name'>{name}</p>
                <p>price {price}</p>
                <p><small>{seller} </small></p>
            </div>
            <button onClick={() => props.handleAddToCart(props.product)} className='button-cart' >
                <p>Add to cart</p>
                <FontAwesomeIcon icon={faShoppingCart} />
            </button>


        </div>
    );
};

export default Product;