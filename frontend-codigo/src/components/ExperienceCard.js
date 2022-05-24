import React from 'react'
import './ExperienceCard.css';
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

function ExperienceCard({ id, imgExp, name, rating }) {
    return (
        <div key={id} className='experience-card'>
            <img
                src={`http://localhost:3000/experiences/${id}/${imgExp}`}
                alt={`foto portada experiencia ${name}`}
            />
            <Link to={`/experiences/${id}`}>{name}</Link>

            {rating !== null ? (
                <ReactStars
                    value={rating}
                    count={5}
                    size={24}
                    activeColor="#ffd700"
                    edit={false}
                />
            ) : (
                <div>Aún sin valorar</div>
            )}
        </div>
    )
}

export default ExperienceCard;


