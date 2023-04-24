import React from 'react';
import './ReviewItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ReviewItem = (props) => {
    console.log(props)
    const { name, quantity, price, img } = props.product
    return (
        <div className='review-item'>
            <div>
                <img src={img} alt="" />
            </div>
            <div className="review-details-container">
                <div className="review-detail">
                    <p>{name}</p>
                    <p>{price}</p>


                </div>
                <div className="review-button">
                    <button onClick={() => props.handleDelete(props.product)} className='delete-button'>
                        <FontAwesomeIcon className='delete-icon' icon={faTrashAlt}></FontAwesomeIcon>
                    </button>

                </div>
            </div>

        </div>
    );
};

export default ReviewItem;