import "./style.css";
import { useState } from "react";
import { useHistory } from "react-router";
import PhotosSlider from "../PhotosSlider";
import formatEmail from "../../helpers/formatEmail";
import Avatar from "../Avatar";
import Rating from "@material-ui/lab/Rating";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import decodeTokenData from "../../helpers/decodeTokenData";
import { toast } from "react-toastify";

const Entry = ({
  id,
  place,
  date,
  votes,
  photos,
  description,
  ownerId,
  userName,
  userAvatar,
  userEmail,
  setIsEditable,
}) => {
  const [votesScore, setVotesScore] = useState(votes);
  const [showVoteOptions, setShowVoteOptions] = useState(false);
  const [token] = useUserTokenContext();
  const decodedToken = decodeTokenData(token);
  const history = useHistory();

  const voteEntry = async (userVoteScore) => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/entries/${id}/votes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ vote: userVoteScore }),
      }
    );

    if (res.ok) {
      const body = await res.json();
      setVotesScore(body.data.votes);
      toast.success("¡Votaste la entrada!");
    } else {
      const error = await res.json();
      toast.error(error.message);
    }
  };

  const deleteEntry = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/entries/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );

    if (res.ok) {
      toast.success("Entrada borrada");
      history.push("/");
    } else {
      const error = await res.json();
      toast.error(error.message);
    }
  };

  return (
    <div
      className="entry"
      onClick={() => {
        history.push(`/entry/${id}`);
      }}
    >
      <div className="entry_user_info">
        <Avatar name={userName || formatEmail(userEmail)} avatar={userAvatar} />
        <p className="entry_user_name">
          {userName?.toLowerCase() || formatEmail(userEmail)}
        </p>
        {decodedToken.id === ownerId && (
          <>
            <FontAwesomeIcon icon={faTrashAlt} onClick={deleteEntry} />
            <FontAwesomeIcon
              className="entry_edit"
              icon={faPencilAlt}
              onClick={() => setIsEditable(true)}
            />
          </>
        )}
      </div>
      <PhotosSlider entryPhotos={photos} entryPlace={place} />
      {description && (
        <div className="entry_description_container">
          <span className="entry_description_name">
            {userName?.toLowerCase() || formatEmail(userEmail)}
          </span>
          <span className="entry_description">{description}</span>
        </div>
      )}
      <div className="entry_info">
        <p className="entry_place">{place}</p>
        <div
          className="entry_votes_container"
          onMouseEnter={() => {
            setShowVoteOptions(true);
          }}
          onMouseLeave={() => {
            setShowVoteOptions(false);
          }}
        >
          {!showVoteOptions || !token ? (
            <p className="entry_votes">{Math.round(votesScore)}</p>
          ) : (
            <div onClick={(e) => e.stopPropagation()}>
              <Rating
                name="entry_votes_input"
                onChange={(e, newValue) => {
                  e.stopPropagation();
                  voteEntry(newValue);
                }}
              />
            </div>
          )}
        </div>

        <p className="entry_date">{date.split("T")[0]}</p>
      </div>
    </div>
  );
};

export default Entry;
