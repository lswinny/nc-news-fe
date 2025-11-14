import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { getTopics } from "../api";

function useArticleFiltersData() {
  const [topics, setTopics] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedTopic = searchParams.get("topic") || "";
  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    getTopics()
      .then((data) => {
        setTopics(data.topics);
      })
      .catch((error) => {
        if (process.env.NODE_ENV !== "production") {
          console.error("Error fetching topics: ", error);
        }
        setError(error);
        setTopics([]);
        setIsLoading(false);
      });
  }, []);

  const handleChange = (newTopic, newSortBy, newOrder) => {
    const params = new URLSearchParams();
    if (newTopic) params.set("topic", newTopic);
    if (newSortBy) params.set("sort_by", newSortBy);
    if (newOrder) params.set("order", newOrder);
    setSearchParams(params);
  };

  return {
    topics,
    selectedTopic,
    sortBy,
    order,
    handleChange,
  };
}

export default useArticleFiltersData;
