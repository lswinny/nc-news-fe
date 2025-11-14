import { useEffect, useState } from "react";
import { getArticles } from "../api";

function useArticlesData({ selectedTopic, sortBy, order }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = `?topic=${selectedTopic}&sort_by=${sortBy}&order=${order}`;
    getArticles(query)
      .then((data) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch((error) => {
        if (process.env.NODE_ENV !== "production") {
          console.error("Error fetching articles: ", error);
        }
        setError(error);
        setArticles([]);
        setIsLoading(false);
      });
  }, [selectedTopic, sortBy, order]);

  return {
    articles,
    isLoading,
    error,
  };
}

export default useArticlesData;
