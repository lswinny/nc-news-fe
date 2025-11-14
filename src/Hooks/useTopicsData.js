import { useEffect, useState } from "react";
import { getTopics } from "../api";

function useTopicsData () {
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getTopics()
        .then((data) => {
            setTopics(data.topics)
            setIsLoading(false);
        })
      .catch((error) => {
        console.error("Error fetching Topics: ", error);
        setError(error);
        setTopics(null);
        setIsLoading(false);
      });
  }, []);

  return {
    topics,
    isLoading,
    error,
  }
}

export default useTopicsData;
