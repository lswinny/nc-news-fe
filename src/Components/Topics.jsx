import useTopicsData from "../Hooks/useTopicsData";
import {Link} from "react-router-dom";

function Topics () {

  const {
    topics,
    isLoading,
    error,
  } = useTopicsData();

if (error) return <p>Error: {error.message || "No topics found."}</p>;
if (isLoading) return <p>Loading... </p>;

  return (
    <>
    <h2 className="page-headers">Topics</h2>
    <div className="topic-list">
        {topics.map((topic) => (
          <div className="topic-card-all" key={topic.slug}>
            <h3>{topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}</h3>
            <p>{topic.description}</p>
            <Link to={`/topics/${topic.slug}`}>
                <button className="profile-button">View Related Articles</button>
              </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default Topics;
