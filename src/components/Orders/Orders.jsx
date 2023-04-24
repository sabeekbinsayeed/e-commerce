import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const { products, initialCart } = useLoaderData();
    const [carts, setCart] = useState(initialCart)

    const handleDeleteCart = () => {
        setCart([])
        deleteShoppingCart();
    }
    const handleDelete = pd => {

        const rest = carts.filter(cd => cd.id != pd.id)

        const newCarts = [...rest]
        setCart(newCarts)
        console.log(newCarts)
        console.log('deleting')
        removeFromDb(pd.id)
    }


    return (
        <div className='shop-container'>
            <div className="">
                {
                    carts.map(product => <ReviewItem handleDelete={handleDelete} product={product}></ReviewItem>)
                }
            </div>
            <div className="cart-container">
                <h1>this is cart</h1>
                <Cart handleDeleteCart={handleDeleteCart} carts={carts} >
                    Go to shop again <Link to='/'>shop </Link>
                </Cart>
                {/* <Cart carts={carts}></Cart> */}

            </div>

        </div>
    );
};

export default Orders;