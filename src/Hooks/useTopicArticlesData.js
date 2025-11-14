import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticles } from "../api";

function useTopicArticlesData() {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticles(`?topic=${topic}`)
      .then((data) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch((error) => {
        if (process.env.NODE_ENV !== "production") {
          console.error("Error fetching articles: ", error);
        }
        setError(error);
        setIsLoading(false);
      });
  }, [topic]);

  return {
    topic,
    articles,
    isLoading,
    error,
  };
}

export default useTopicArticlesData;
