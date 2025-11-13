import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getArticles } from "../api";
import ArticleFilters from "./ArticleFilters";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
const [searchParams, setSearchParams] = useSearchParams();

const selectedTopic = searchParams.get("topic") || "";
const sortBy = searchParams.get("sort_by") || "created_at";
const order = searchParams.get("order") || "desc";

  
  useEffect(() => {
    const query = `?topic=${selectedTopic}&sort_by=${sortBy}&order=${order}`;
    getArticles(query)
      .then((data) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Articles: ", error);
        setArticles(null);
        setIsLoading(false);
      });
  }, [selectedTopic, sortBy, order]);

  if (isLoading) return <p>Loading... </p>;
  if (!articles) return <p>Something went wrong loading articles.</p>;


  return (
    <>
    <h2 className="page-headers">Articles</h2>
        <ArticleFilters
        selectedTopic={selectedTopic}
        sortBy={sortBy}
        order={order}
        setSearchParams={setSearchParams}
      />
    <div className="article-list">
        {articles.map((article) => (
          <div className="article-card-all" key={article.article_id}>
            <Link to={`${article.article_id}`}> <img src={article.article_img_url} alt={article.title}/></Link>
            <h3>{article.title}</h3>
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
