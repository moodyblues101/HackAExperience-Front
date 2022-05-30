import React, { useCallback, useEffect } from 'react'
import './ExperienceCard.css';
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { useHttpClient } from "../hooks/http-hook";

function ExperienceCard({ id, imgExp, name, rating }) {
    const { sendRequest } = useHttpClient();

    const fetchExperiences = useCallback(async () => {
        const resExp = await sendRequest(
            "http://localhost:3000/api/v1/experiences"
        );
        const expToShow = [];
        for (let i = 0; i < resExp.length; i++) {
            const id = resExp[i].id;
            const resImg = await sendRequest(
                `http://localhost:3000/api/v1/experiences/${id}/images`
            );

            expToShow.push({ ...resExp[i], imgExp: resImg[0].name });
        }
    }, [sendRequest]);

    useEffect(() => {
        fetchExperiences();
    }, [fetchExperiences]);
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


