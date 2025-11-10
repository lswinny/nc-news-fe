import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getArticles, getArticlesById } from "../api";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticles()
      .then((data) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Articles: ", error);
        setArticles(null);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading... </p>;

  return (
    <>
        {articles.map((article) => (
          <div className="Articles" key={article.article_id}>
            <p>__________________________________________________________________________________________________________</p>
            <p>Title: {article.title}</p>
            <p>Author: {article.author}</p>
            <p>Topic: {article.topic}</p>
            <p>Votes: {article.votes}</p>
            <p>Comment Count: {article.comment_count}</p>
            <p>Created At: {article.created_at}</p>
            <img src={article.article_img_url} alt={article.title}/>
            <p>__________________________________________________________________________________________________________</p>
          </div>
        ))}
    </>
  );
}

export default Articles;
