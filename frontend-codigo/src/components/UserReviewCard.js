import React from 'react'
import './UserReviewCard.css';

const Review = (props) => {
    return (
        <div className='user-review-card'>
            <img
                src={`http://localhost:3000/avatars/${props.avatar}`}
                alt={`avatar user ${props.name}`}
            />
            <div className='card-info'>
                <h2>{props.name}</h2>
                <h4>{props.comment}</h4>
            </div>
        </div>
    );
};

export default Review;

