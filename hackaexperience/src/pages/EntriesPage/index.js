import "./style.css";
import useEntries from "../../hooks/useEntries";
import Entry from "../../components/Entry";
import List from "../../components/List";

const EntriesPage = () => {
  const [entries] = useEntries();

  return (
    <div className="entries_page page">
      {entries.length > 0 && (
        <List
          className="entries_list"
          data={entries}
          render={(entry) => (
            <Entry
              key={entry.id}
              id={entry.id}
              place={entry.place}
              date={entry.date}
              votes={entry.votes}
              photos={entry.photos}
              ownerId={entry.user_id}
              userName={entry.user_name}
              userAvatar={entry.user_avatar}
              userEmail={entry.user_email}
            />
          )}
        />
      )}
    </div>
  );
};

export default EntriesPage;
