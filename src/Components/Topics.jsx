import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { getTopics } from "../api";

function Topics () {
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getTopics()
        .then((data) => {
            setTopics(data.topics)
            setIsLoading(false);
        })
      .catch((error) => {
        console.error("Error fetching Topics: ", error);
        setTopics(null);
        setIsLoading(false);
      });
  }, []);


if (isLoading) return <p>Loading... </p>;
if (!topics) return <p>Something went wrong loading topics.</p>;

  return (
    <>
    <h2 className="page-headers">Topics</h2>
    <div className="topic-list">
        {topics.map((topic) => (
          <div className="topic-card-all" key={topic.slug}>
            <h3>{topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}</h3>
            <p>{topic.description}</p>
            <Link to={`/topic/${topic.slug}`}>
                <button className="profile-button">View Related Articles</button>
              </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default Topics;
