import { useEffect, useState } from "react";
import { getTopics } from "../api";
import { useSearchParams } from "react-router";

function ArticleFilters({ selectedTopic, sortBy, order }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((data) => {
      setTopics(data.topics);
    });
  }, []);

  const handleChange = (newTopic, newSortBy, newOrder) => {
    const params = new URLSearchParams();
    if (newTopic) params.set("topic", newTopic);
    if (newSortBy) params.set("sort_by", newSortBy);
    if (newOrder) params.set("order", newOrder);
    setSearchParams(params);
  };

  return (
    <form className="article-filters">
      <label htmlFor="topic">Filter by Topic:</label>
      <select
        id="topic"
        value={selectedTopic}
        onChange={(event) => handleChange(event.target.value, sortBy, order)}
      >
        <option value="">All Topics</option>
        {topics.map((topic) => (
          <option key={topic.slug} value={topic.slug}>
            {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
          </option>
        ))}
      </select>

      <label htmlFor="sort-by">Sort By:</label>
      <select
        id="sort-by"
        value={sortBy}
        onChange={(event) =>
          handleChange(selectedTopic, event.target.value, order)
        }
      >
        <option value="created_at">Created Date</option>
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="votes">Votes</option>
        <option value="comment_count">Comment Count</option>
      </select>

      <button
        type="button"
        onClick={() =>
          handleChange(selectedTopic, sortBy, order === "asc" ? "desc" : "asc")
        }
      >
        {order === "asc" ? "Ascending" : "Descending"}
      </button>
    </form>
  );
}

export default ArticleFilters;
