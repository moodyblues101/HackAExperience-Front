import "./style.css";
import { useState } from "react";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import useEntry from "../../hooks/useEntry";
import Entry from "../../components/Entry";
import EditEntryForm from "../../components/EditEntryForm";

const EntryPage = () => {
  const { id } = useParams();
  const [refetchEntry, setRefetchEntry] = useState(false);
  const [entry] = useEntry(id, refetchEntry, setRefetchEntry);
  const [isEditable, setIsEditable] = useState(false);

  return (
    <div className="entry_page page">
      {Object.values(entry).length > 0 &&
        (!isEditable ? (
          <Entry
            id={entry.id}
            place={entry.place}
            date={entry.date}
            votes={entry.votes}
            photos={entry.photos}
            ownerId={entry.user_id}
            userName={entry.user_name}
            userAvatar={entry.user_avatar}
            userEmail={entry.user_email}
            description={entry.description}
            setIsEditable={setIsEditable}
          />
        ) : (
          <>
            <EditEntryForm
              id={entry.id}
              place={entry.place}
              description={entry.description}
              photos={entry.photos}
              setRefetchEntry={setRefetchEntry}
            />
            <FontAwesomeIcon
              className="go_back"
              icon={faArrowAltCircleLeft}
              onClick={() => setIsEditable(false)}
            />
          </>
        ))}
    </div>
  );
};

export default EntryPage;
