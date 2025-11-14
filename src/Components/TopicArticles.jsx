import { Link } from "react-router-dom";
import useTopicArticlesData from "../Hooks/useTopicArticlesData";

function TopicArticles() {
  const { topic, articles, isLoading, error } = useTopicArticlesData();

  if (error) return <p>Error loading: {error.message}</p>;
  if (isLoading) return <p>Loading...</p>;
  if (articles.length === 0) return <p>No articles found.</p>;

  return (
    <>
      <h2 className="page-headers">
        {topic.charAt(0).toUpperCase() + topic.slice(1)} Articles
      </h2>
      <div className="article-list">
        {articles.map((article) => (
          <div className="article-card-all" key={article.article_id}>
            <Link to={`/articles/${article.article_id}`}>
              {" "}
              <img src={article.article_img_url} alt={article.title} />
            </Link>
            <h3>Title: {article.title}</h3>
            <p>Author: {article.author}</p>
            <p>
              Topic:{" "}
              {article.topic.charAt(0).toUpperCase() + article.topic.slice(1)}
            </p>
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
