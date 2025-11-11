import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticlesById } from "../api";

function ArticleSpecific() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticlesById(article_id).then((data) => {
      setArticle(data.article);
      setIsLoading(false);
    })
  .catch((error) => {
   console.error("Error fetching article:", error);
   setArticle(null);
   setIsLoading(false);
  })}, [article_id])

  const handleThumbsUp = () => {
    setVotes((prev) => prev + 1)
  };

  const handleThumbsDown = () => {
    setVotes((prev) => prev - 1)
  };
  

  if (isLoading) return <p>Loading...</p>;
  if (!article) return <p>Article not found.</p>;
  
  return (
    <section className="article-card-specific" key={article.article_id}>
      <h2>{article.title}</h2>
      <img src={article.article_img_url} alt={article.title} />
      <div className="all-p-tags">
      <p>Author: {article.author}</p>
      <p>Topic: {article.topic}</p>
      <p>Comments: {article.comment_count}</p>
      <p>Created: {new Date(article.created_at).toLocaleString()}</p>
      <p>Votes: {article.votes} <button onClick={handleThumbsUp}>👍</button> <button onClick={handleThumbsDown}>👎</button></p>
      </div>
      <div className="article-body">
        <p>{article.body}</p>
      </div>
      </section>
  );
}
 
export default ArticleSpecific;
