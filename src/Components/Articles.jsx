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
  if (!articles) return <p>Something went wrong loading articles.</p>;


  return (
    <>
    <div className="article-list">
        {articles.map((article) => (
          <div className="article-card-all" key={article.article_id}>
            <Link to={`${article.article_id}`}> <img src={article.article_img_url} alt={article.title}/></Link>
            <h3 >Title: {article.title}</h3>
            <p>Author: {article.author}</p>
            <p>Topic: {article.topic.charAt(0).toUpperCase() + article.topic.slice(1)}</p>
            <p>Votes: {article.votes}</p>
            <p>Comment Count: {article.comment_count}</p>
            <p>Created: {new Date(article.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Articles;
