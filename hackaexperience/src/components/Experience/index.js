import "./style.css";

import { useHistory } from "react-router";

const Experience = ({
    id,
    name,
    description,
    city,
    price,
    totalPlaces,
    availablePlaces,
    visits,
    eventStartDate,
    eventEndDate,
    createdAt,
    updatedAt,
    idCategory,
}) => {
    const history = useHistory();

    const decodedToken = decodeTokenData(token);

    const deleteExperience = async () => {
        const res = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/entries/${id}`,
            {
                method: 'DELETE',
                headers: {
                    Authozation: token,
                },
            }
        );
    }

    return (
        <div
            className="experience"
            onClick={() => {
                history.push(`/experience/${id}`);
            }}
        >
            <div>

            </div>
        </div>
    );
}