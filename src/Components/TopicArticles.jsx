import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticles } from "../api";


function TopicArticles() {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    getArticles(`?topic=${topic}`)
    .then((data) => {
      setArticles(data.articles);
      setIsLoading(false);     
    })
  .catch((error) => {
   console.error("Error fetching articles:", error);
   setIsLoading (false);
  })
}, [topic])


  if (isLoading) return <p>Loading...</p>;
  if (articles.length === 0) return <p>No articles found.</p>;
  
  return (
    <>
    <h2 className="page-headers">{topic.charAt(0).toUpperCase() + topic.slice(1)} Articles</h2>
    <div className="article-list">
        {articles.map((article) => (
          <div className="article-card-all" key={article.article_id}>
            <Link to={`/articles/${article.article_id}`}> <img src={article.article_img_url} alt={article.title}/></Link>
            <h3>Title: {article.title}</h3>
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
 
export default TopicArticles;
