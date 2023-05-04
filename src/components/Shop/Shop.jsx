import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';

//pagiination basics
// total data (count):
//per page data (size): ( chnage hoite pare , user jdi 10,15 egula deiiii)
// total pages (): (uporer ta upor depend kore eitao chang heobe)
// current page ( eita change hobe)

const Shop = () => {
    const [products, setProducts] = useState([])
    const [carts, setCarts] = useState([])
    const [count, setCount] = useState(0);

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const perPage = 10;
    const numberOfPages = Math.ceil(count / size);

    useEffect(() => {
        console.log('called useEffect1')
        const url = `http://localhost:5000/products?page=${page}&size=${size}`;
        fetch(url)
            .then(res => res.json())
            .then(data => { setProducts(data.products); setCount(data.count) })
    }, [page, size]);

    // useEffect(() => {
    //     console.log('called useEffect2')
    //     const storedCart = getShoppingCart();
    //     console.log(storedCart)
    //     const savedCart = [];
    //     // step 1: get id of the addedProduct
    //     for (const id in storedCart) {
    //         const addedProduct = products.find(product => product.id == id)
    //         if (addedProduct) {
    //             const newQuantity = storedCart[id]
    //             addedProduct.quantity = newQuantity
    //             console.log(addedProduct)
    //             savedCart.push(addedProduct)
    //         }
    //         // step 2: get product from products state by using id
    //     }
    //     setCarts(savedCart)

    // }, [products])

    useEffect(() => {
        console.log('bhai ami call hosci upore')
        const storedCart = getShoppingCart();
        console.log('bhai storedCart', storedCart)
        const savedCart = [];
        const ids = Object.keys(storedCart);
        console.log(ids);
        fetch('http://localhost:5000/productsByIds', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(data => {
                console.log('bhai ekhon for loop chalabo stored cart e', storedCart)
                for (const id in storedCart) {
                    const addedProduct = data.find(product => product._id === id);
                    if (addedProduct) {
                        const quantity = storedCart[id];
                        addedProduct.quantity = quantity;
                        savedCart.push(addedProduct);
                    }
                }
                setCarts(savedCart);

            })

    }, [products])


    const handleDeleteCart = () => {
        setCarts([])
        deleteShoppingCart();
    }
    const handleAddToCart = coming_product => {
        console.log('hehe coming product', coming_product)
        console.log('hehe coming carts', carts)
        let new_cart = []
        const exist = carts.find(pd => pd._id == coming_product._id)

        if (!exist) {

            coming_product.quantity = 1;
            new_cart = [...carts, coming_product]
        }
        else {
            const restProduct = carts.filter(pd => pd._id != coming_product._id)
            exist.quantity = exist.quantity + 1
            new_cart = [...restProduct, exist]

        }
        console.log(new_cart)
        setCarts(new_cart)
        // console.log('1', coming_product.id)
        console.log('2', coming_product._id)
        addToDb(coming_product._id)


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

                <Cart handleDeleteCart={handleDeleteCart} carts={carts}>

                    <Link to="/orders">
                        <button>Review Order</button>
                    </Link>
                </Cart>

            </div>
            <div className="pagination">
                <p>Currently selected page: {page} and size: {size}</p>
                {
                    [...Array(numberOfPages).keys()].map(number => <button
                        key={number}
                        className={page === number ? 'selected' : ''}
                        onClick={() => setPage(number)}
                    >
                        {number + 1}
                    </button>)
                }
                <select onChange={event => setSize(event.target.value)}>
                    <option value="5">5</option>
                    <option value="10" selected>10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>

        </div>

    );
};

export default Shop;